import { Grid, Typography } from "@mui/material";
import Address from "../../model/Address";
import { useEffect } from "react";
import { IoCall, IoFileTray, IoLocation, IoMailOpen } from "react-icons/io5";
import { IconContext } from "react-icons/lib";
import { Outlet, useLocation } from "react-router-dom";
import { defaultImg } from "../../constants/defaultValues";
import { useLocalStorage } from "../../hook/useLocalStorage";
import {
  Card,
  CenterColumn,
  FlexCenterContainer,
  Image,
  Row,
} from "./Profile.style";
import _ from "lodash";

function Profile() {
  const [shopInfo] = useLocalStorage("shopInfo", null);
  const location = useLocation();
  const marginVertical2rem = { margin: "2rem 0" };

  // useEffect(() => {
  //   getAccountImage(shopInfo.account.id, session).then((data) => {
  //     if (data != null && data !== "") {
  //       setAvatar(data);
  //     } else {
  //       setAvatar(defaultImg);
  //     }
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {}, [shopInfo]);

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
        <Card style={{ padding: "3rem 0" }}>
          <FlexCenterContainer>
            {/* {avatar != null ? (
              <Image src={avatar} />
            ) : (
              <CircularProgress style={{ margin: "2rem 0" }} />
            )} */}
            <Image
              src={
                _.isString(shopInfo.account.imageUrl) &&
                !_.isEmpty(shopInfo.account.imageUrl)
                  ? shopInfo.account.imageUrl
                  : defaultImg
              }
            />
            <Typography
              variant="h5"
              className="primaryColor"
              sx={{ mt: "1rem" }}>
              {shopInfo.name}
            </Typography>
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
                {shopInfo.addresses?.map((address: Address) => (
                  <Typography>
                    {address.street +
                      ", " +
                      address.district +
                      ", " +
                      address.city +
                      ", " +
                      (address.province ? `${address.province}, ` : "") +
                      address.country}
                  </Typography>
                ))}
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
            {shopInfo.description.split("\n").map((p: string, pi: number) => (
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
