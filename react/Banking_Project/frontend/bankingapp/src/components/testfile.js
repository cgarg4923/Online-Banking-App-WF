import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import { Container, TextField, Grid, Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppDrawer from "./Drawer";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#B04040",
    },
  },
});
function createData(
  transactionType,
  senderAccount,
  receiverAccount,
  amount,
  transactionDate,
  type
) {
  return {
    transactionType,
    senderAccount,
    receiverAccount,
    amount,
    transactionDate,
    type,
  };
}

export default function AccountStatementTest() {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");

  var customerId;
  useEffect(() => {
    var dat = window.sessionStorage.getItem("userCredentials");
    var data = JSON.parse(dat);
    customerId = data["customerId"];
    const baseURL =
      "http://localhost:9080/customer/fetchCustomerAccounts/" + customerId;
    axios
      .get(baseURL)
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(accounts);
  }, []);

  const handleSelectAccount = (e) => {
    setSelectedAccount(e.target.value);
  };

  React.useEffect(() => {
    const baseURLTransaction = `http://localhost:3001/${selectedAccount}`;
    axios
      .get(baseURLTransaction)
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedAccount]);
  const rows = [];
  transactions.map((transaction) => {
    console.log("Executed");
    if (transaction.senderAccount in accounts) {
      rows.push(
        createData(
          transaction.transactionType,
          transaction.senderAccount,
          transaction.receiverAccount,
          transaction.amount,
          transaction.transactionDate,
          "DE"
        )
      );
    } else {
      rows.push(
        createData(
          transaction.transactionType,
          transaction.senderAccount,
          transaction.receiverAccount,
          transaction.amount,
          transaction.transactionDate,
          "CR"
        )
      );
    }
  });
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <AppDrawer />
          <div style={{ marginTop: "100px" }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="From Date"
                  //value={fromAccount}
                  //onChange={(e) => setFromAccount(e.target.value)}
                  fullWidth
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  style={{ padding: "10px" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="To Date"
                  //value={fromAccount}
                  //onChange={(e) => setFromAccount(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  style={{ padding: "10px" }}
                />
              </Grid>
              <Grid item xs={4}>
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
            <Button
              //onClick={setIsPressed(true)}
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              style={{ width: "30%" }}
            >
              Go
            </Button>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Mode</TableCell>
                  <TableCell align="right">From</TableCell>
                  <TableCell align="right">To</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Method</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.transactionType}
                    </TableCell>
                    <TableCell align="right">{row.senderAccount}</TableCell>
                    <TableCell align="right">{row.receiverAccount}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right">{row.transactionDate}</TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
