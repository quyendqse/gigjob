import { Grid, Link, Typography } from "@mui/material";
import {
  IoCall,
  IoFileTray,
  IoGlobe,
  IoLocation,
  IoMailOpen,
} from "react-icons/io5";
import { IconContext } from "react-icons/lib";
import { account } from "../../mockData/shopProfile";
import { useAppSelector } from "../../store/hooks";
import { selectShop } from "../../store/shop/shopSlice";
import {
  Card,
  CenterColumn,
  FlexCenterContainer,
  Image,
  ShopInfoLabel,
  ShopInfoValue,
  EquallyRow,
  Row,
} from "./Profile.style";

function Profile() {
  const shopProfile = useAppSelector(selectShop);

  const card2RemTop = { margin: "2rem 0 0 0" };
  return (
    <Grid container spacing={4}>
      <Grid item xl={5} xs={12}>
        <Card>
          <FlexCenterContainer>
            <Image src={account.image_url} />
            <Typography variant="h5" className="primaryColor">
              {shopProfile.name}
            </Typography>
            <EquallyRow>
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
            </EquallyRow>
          </FlexCenterContainer>
        </Card>
        <Card style={card2RemTop}>
          <Typography variant="h5" sx={{ margin: "1rem" }}>
            Detail Information
          </Typography>
          <IconContext.Provider value={{ size: "32px" }}>
            <Row>
              <div style={{ margin: "0 0.5rem 0 1rem" }}>
                <IoLocation className="primaryColor" />
              </div>
              <div id="col" style={{ padding: "0.5rem 0.5rem" }}>
                {shopProfile.address?.map((a) => (
                  <Typography>{a.location}</Typography>
                )) ?? "None"}
              </div>
            </Row>
            <Row>
              <div style={{ margin: "0 0.5rem 0 1rem" }}>
                <IoMailOpen className="primaryColor" />
              </div>
              <div id="col" style={{ padding: "0.5rem 0.5rem" }}>
                {[account.email]?.map((m) => <Typography>{m}</Typography>) ??
                  "None"}
              </div>
            </Row>
            <Row>
              <div style={{ margin: "0 0.5rem 0 1rem" }}>
                <IoCall className="primaryColor" />
              </div>
              <div id="col" style={{ padding: "0.5rem 0.5rem" }}>
                <Typography>+84 12 345 6789</Typography>
              </div>
            </Row>
            <Row>
              <div style={{ margin: "0 0.5rem 0 1rem" }}>
                <IoGlobe className="primaryColor" />
              </div>
              <div id="col" style={{ padding: "0.5rem 0.5rem" }}>
                {[shopProfile.website].map((w) => (
                  <Link href={w} underline="hover">
                    {w}
                  </Link>
                ))}
              </div>
            </Row>
          </IconContext.Provider>
        </Card>
        <Card style={{ margin: "2rem 0" }}>
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
        <Card>
          <Typography variant="h5" sx={{ margin: "1rem" }}>
            About Company
          </Typography>
          <div style={{ margin: "0 1rem" }}>
            {shopProfile.description.split("\n").map((p) => (
              <Typography variant="body1" sx={{ textAlign: "justify" }}>
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
