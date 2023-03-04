import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAppSelector } from "../../store/hooks";
import { selectShop } from "../../store/shop/shopSlice";
function Home() {
  const shop = useAppSelector(selectShop);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        fontSize: "20px",
        height: "100px",
      }}>
      <Typography variant="h5">Welcome, {shop.name}</Typography>
    </Box>
  );
}

export default Home;
