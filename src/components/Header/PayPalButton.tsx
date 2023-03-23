import { Box, Typography, CircularProgress } from "@mui/material";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";
import { Card } from "../../pages/Profiles/Profile.style";
function PayPalButton(props: { amount: number }) {
  const { shopInfo } = useAuth();
  const handleApprove = (orderId: string) => {};
  const [fetchingRate, setFetchingRate] = useState(-1);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://currency-exchange.p.rapidapi.com/exchange",
      params: { from: "USD", to: "VND" },
      headers: {
        "X-RapidAPI-Key": "310e4ddaf6msh38afba5f459839ep1723fajsn5f372d5f3a59",
        "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        setFetchingRate(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <Box component={Card}>
      <Typography variant="h5" align="center" sx={{ mt: "3rem", mb: "1rem" }}>
        Top up
      </Typography>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          mb: "3rem",
        }}>
        <Typography align="center" variant="h3" display={"inline-block"}>
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(props.amount)}
        </Typography>
        <IoChevronForward style={{ margin: "0 1rem" }} />
        {fetchingRate === -1 ? (
          <CircularProgress />
        ) : (
          <Typography align="center" variant="h4" display={"inline-block"}>
            {Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(props.amount * fetchingRate)}
          </Typography>
        )}
      </Box>
      <PayPalButtons
        style={{
          color: "gold",
          layout: "horizontal",
          height: 48,
          tagline: false,
          shape: "pill",
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: `Top up at GigJob for shop ${shopInfo?.name}`,
                amount: {
                  value: props.amount.toString(),
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order!.capture();
          console.log("order", order);

          handleApprove(data.orderID);
        }}
        onError={(err) => {
          console.log(err);
          console.error("PayPal Checkout onError", err);
        }}
        onCancel={() => {
          alert("Transaction cancelled");
        }}
      />
    </Box>
  );
}

export default PayPalButton;
