import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { Card } from "../Profiles/Profile.style";
import { Box } from "@mui/system";
import AddCircleIcon from "@mui/icons-material/AddCircle";
function createData(
  name: string,
  type: string,
  status: string,
  salary: string,
  action: string
) {
  return { name, type, status, salary, action };
}

const rows = [
  createData("jonh doe", "cashier", "Done", "3,200,000vnd", "Pay"),
  createData("jonh doe", "cashier", "Pending", "3,200,000vnd", "Bought"),
  createData("jonh doe", "cashier", "Pending", "3,200,000vnd", "Bought"),
  createData("jonh doe", "cashier", "Pending", "3,200,000vnd", "Bought"),
];

export default function Payment() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Card>
          <TableContainer component={Card} sx={{ mt: "1rem" }}> 
          <Table aria-label="simple table">
            <TableHead>
              <Typography sx={{fontWeight:'700'}}> Pending Payment </Typography>
              <TableRow>
                <TableCell> Name </TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell> {row.name} </TableCell>
                  <TableCell> {row.type} </TableCell>
                  <TableCell> {row.status} </TableCell>
                  <TableCell> {row.salary} </TableCell>
                  <TableCell>
                    <Button
                      sx={{ width: "80%", height: "40px" }}
                      variant="contained"
                    >
                      {row.action}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
        </Card>
      </Grid>
      <Grid item xs={4}> 
        <Card> 
        <TableContainer component={Card} sx={{ mt: "1rem" }}> 
        <Table aria-label="simple table">
          <Typography sx={{fontWeight:'700'}}> Current Balance </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-around",
            }}
          >    
            <Typography> 1,234,123 VND </Typography>
            <IconButton>
              <AddCircleIcon sx={{color:'#A23F00'}}/>
            </IconButton>
          </Box>
          </Table>
          </TableContainer>
        </Card>
      </Grid>
    </Grid>
  );
}
