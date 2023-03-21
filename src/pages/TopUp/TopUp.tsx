import { Grid, Typography } from "@mui/material";
import PayPalButton from "../../components/Header/PayPalButton";

const options = [249.0, 699.0, 999.0, 1299.0, 2499.0];

function TopUp() {
  return (
    <>
      <Grid container spacing={2}>
        {options.map((o) => (
          <Grid item md={12} xl={4} lg={6}>
            <PayPalButton amount={o} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default TopUp;
