import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { IoCall, IoFileTray, IoLocation, IoMailOpen } from "react-icons/io5";
import { IconContext } from "react-icons/lib";
import { Outlet, useLocation } from "react-router-dom";
import { ShopResponse } from "../../api/response/ShopResponse";
import { shopAccount } from "../../mockData/accountData";
import {
  Card,
  CenterColumn,
  FlexCenterContainer,
  Image,
  Row,
} from "./Profile.style";

function Profile() {
  const [shopInfo, setShopInfo] = useState(
    JSON.parse(window.localStorage.getItem("shopInfo")!) as ShopResponse
  );
  const location = useLocation();
  const marginVertical2rem = { margin: "2rem 0" };
  if (location.pathname !== "/profile") {
    return <Outlet />;
  }
  return (
    <Grid container spacing={4}>
      <Grid
        item
        xl={5}
        xs={12}
        sx={{ paddingBottom: { xl: "2rem", xs: "none" } }}>
        <Card>
          <FlexCenterContainer>
            <Image src={shopAccount.imageUrl} />
            <Typography variant="h5" className="primaryColor">
              {shopInfo.name}
            </Typography>
            {/* <EquallyRow>
              <CenterColumn>
                <ShopInfoValue>23</ShopInfoValue>
                <ShopInfoLabel>Posts</ShopInfoLabel>
              </CenterColumn>
              <CenterColumn>
                <ShopInfoValue>N/A</ShopInfoValue>
                <ShopInfoLabel>Reviews</ShopInfoLabel>
              </CenterColumn>
              <CenterColumn>
                <ShopInfoValue>140</ShopInfoValue>
                <ShopInfoLabel>Applicants</ShopInfoLabel>
              </CenterColumn>
            </EquallyRow> */}
          </FlexCenterContainer>
        </Card>
        <Card style={marginVertical2rem}>
          <Typography variant="h5" sx={{ margin: "1rem" }}>
            Detail Information
          </Typography>
          <IconContext.Provider value={{ size: "32px" }}>
            <Row>
              <div style={{ margin: "0 0.5rem 0 1rem" }}>
                <IoLocation className="primaryColor" />
              </div>
              <div id="col" style={{ padding: "0.5rem 0.5rem" }}>
                {shopInfo.addresses?.map(
                  ({ street, district, country, province, city }) => (
                    <Typography>
                      {street +
                        ", " +
                        district +
                        ", " +
                        city +
                        ", " +
                        (province ? `${province}, ` : "") +
                        country}
                    </Typography>
                  )
                )}
              </div>
            </Row>
            <Row>
              <div style={{ margin: "0 0.5rem 0 1rem" }}>
                <IoMailOpen className="primaryColor" />
              </div>
              <div id="col" style={{ padding: "0.5rem 0.5rem" }}>
                {shopInfo.account.email ?? "None"}
              </div>
            </Row>
            <Row>
              <div style={{ margin: "0 0.5rem 0 1rem" }}>
                <IoCall className="primaryColor" />
              </div>
              <div id="col" style={{ padding: "0.5rem 0.5rem" }}>
                <Typography>
                  {shopInfo.account.phone ?? "Not available"}
                </Typography>
              </div>
            </Row>
            {/* <Row>
              <div style={{ margin: "0 0.5rem 0 1rem" }}>
                <IoGlobe className="primaryColor" />
              </div>
              <div id="col" style={{ padding: "0.5rem 0.5rem" }}>
                {[shopProfile.website].map((w, li) => (
                  <Link key={li} href={w} underline="hover">
                    {w}
                  </Link>
                ))}
              </div>
            </Row> */}
          </IconContext.Provider>
        </Card>
        <Card>
          <Typography variant="h5" sx={{ margin: "1rem" }}>
            Images
          </Typography>
          <CenterColumn>
            <IoFileTray size={"32px"} color="#a23f00" />
            <Typography>
              You haven't add any images to your profile yet
            </Typography>
          </CenterColumn>
        </Card>
      </Grid>
      <Grid item xl={7} xs={12}>
        <Card style={{ marginBottom: "2rem" }}>
          <Typography variant="h5" sx={{ margin: "1rem" }}>
            About Company
          </Typography>
          <div style={{ margin: "0 1rem" }}>
            {shopInfo.description.split("\n").map((p, pi) => (
              <Typography
                key={pi}
                variant="body1"
                sx={{ textAlign: "justify" }}>
                {p}
              </Typography>
            ))}
          </div>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Profile;
