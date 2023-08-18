import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { Container, Grid, TextField, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppDrawer from "./Drawer";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#B04040",
    },
  },
});

export default function AccountSummary() {

  const [accounts, setAccounts] = useState(["123", "234"]);
  const [selectedAccount, setSelectedAccount] = useState("");

  const handleSelectAccount = (e) => {
    setSelectedAccount(e.target.value);
  };

  function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
  }

  const products = [
    {
      name: "User ID",
      price: "10",
    },
    {
      name: "Account Number",
      price: "10",
    },
    {
      name: "Balance",
      price: "10",
    },
    {
      name: "Account Type",
      price: "10",
    }
  ];

  const rows = [
    createData(
      0,
      '16 Mar, 2019',
      'Elvis Presley',
      'Tupelo, MS',
      'VISA ⠀•••• 3719',
      312.44,
    ),
    createData(
      1,
      '16 Mar, 2019',
      'Paul McCartney',
      'London, UK',
      'VISA ⠀•••• 2574',
      866.99,
    ),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(
      3,
      '16 Mar, 2019',
      'Michael Jackson',
      'Gary, IN',
      'AMEX ⠀•••• 2000',
      654.39,
    ),
    createData(
      4,
      '15 Mar, 2019',
      'Bruce Springsteen',
      'Long Branch, NJ',
      'VISA ⠀•••• 5919',
      212.79,
    ),
  ];

//   .......commented to prevent error do not erase......

  //   useEffect(() => {
  //     var dat = window.sessionStorage.getItem("userCredentials");
  //     var data = JSON.parse(dat);
  //     customerId = data["customerId"];
  //     const baseURL =
  //       "http://localhost:9080/customer/fetchCustomerAccounts/" + customerId;
  //     axios
  //       .get(baseURL)
  //       .then((response) => {
  //         setAccounts(response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }, []);

  //   useEffect(()=>{
  //     const baseURL = ""+selectedAccount;
  //     axios.get(baseURL).then((response)=>{
  //         console.log(response.data);
  //     }).catch((e)=>{console.error(e)});
  //   },[selectedAccount]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
        <AppDrawer />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            style={{ width: "100px" }}
            src={
              "https://png.pngtree.com/png-vector/20190810/ourlarge/pngtree-audit-accounting-banking-budget-business-calculation-finan-png-image_1654072.jpg"
            }
          ></img>
          <Box
            component="form"
            sx={{ width: 500 }}
            //onSubmit={handleSubmit}
          >
            <Typography
              component="h1"
              variant="h5"
              style={{
                fontFamily: "Nanum Myeongjo, serif",
                marginBottom: "15px",
              }}
            >
              <b>Account Summary</b>
            </Typography>
            <Grid>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  value={selectedAccount}
                  onChange={handleSelectAccount}
                  label="Choose Account"
                  select
                  helperText="Choose an account for transaction"
                  style={{ padding: "10px" }}
                >
                  {accounts.map((account, index) => (
                    <MenuItem value={account}>{account}</MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>

          <Container component="main" maxWidth="sm">
        <Paper
          variant="elevation"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Box component="form">
            <React.Fragment>
              
              <List disablePadding>
                {products.map((product) => (
                  <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                    <ListItemText
                      primary={product.name}
                    />
                    <Typography variant="body2">
                      {product.price === "" ? "-" : product.price}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </React.Fragment>
          </Box>
        </Paper>
      </Container>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>To</TableCell>
            <TableCell>From</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="center">Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
              <TableCell>"Debit"</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
