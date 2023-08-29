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
import { Container, TextField, Grid, Button, TablePagination } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppDrawer from "./Drawer";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#B04040",
    },
  },
});
function createData(
  transactionType,
  senderAccountNo,
  receiverAccountNo,
  transactionAmount,
  transactionDate,
  type
) {
  return {
    transactionType,
    senderAccountNo,
    receiverAccountNo,
    transactionAmount,
    transactionDate,
    type
  };
}

export default function AccountStatement() {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [customerId,setCustomerId] = useState("");
  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate] = useState("");
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);
  const [isStartDateSelected,setIsStartDateSelected] = useState(false); 
  const [isEndDateSelected,setIsEndDateSelected] = useState(false); 
  const [isAccountSelected,setIsAccountSelected] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage,setErrorMessage]=useState("Error");
  const navigate = useNavigate();
 
  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }

  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorOpen(false);
  };

  var rows = [];

  useEffect(() => {
        var data = JSON.parse(window.sessionStorage.getItem("userCredentials"));
        setCustomerId(data["customerId"]);
        const baseURL =
          "http://localhost:9080/customer/fetchCustomerAccounts/" + data["customerId"];
        axios
          .get(baseURL)
          .then((response) => {
            setAccounts(response.data);
          })
          .catch((error) => {
            console.error(error.response.status+ " " +error.response.data.message);
          });
   
  }, []);

  const handleSelectAccount = (e) => {
    setSelectedAccount(e.target.value);
    setIsAccountSelected(true);
  };

 useEffect(() => {
    rows = [];
    const baseURLTransaction = `http://localhost:9080/account/fetchTransactions/${selectedAccount}/${startDate}/${endDate}`;
    if(isStartDateSelected && isEndDateSelected && isAccountSelected){
      axios
      .get(baseURLTransaction)
      .then((response) => {
       
        if(typeof(response.data) == "string"){}
        else setTransactions(response.data);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.statusCode +" "+error.response.data.message)
        setErrorOpen(true);
      });
    }  
  },[selectedAccount,startDate,endDate]);

  transactions.map((transaction) => {
    if (transaction.senderAccountNo === selectedAccount) {
      rows.push(
        createData(
          transaction.transactionType,
          transaction.senderAccountNo,
          transaction.receiverAccountNo,
          transaction.transactionAmount,
          transaction.transactionDate,
          "DE"
        )
      );
    } else {
      rows.push(
        createData(
            transaction.transactionType,
            transaction.senderAccountNo,
            transaction.receiverAccountNo,
            transaction.transactionAmount,
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
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="From Date"
                  value={startDate}
                  onChange={(e) => {setStartDate(e.target.value); setIsStartDateSelected(true);}}
                  fullWidth
                  required
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  style={{ padding: "10px" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="To Date"
                  value={endDate}
                  onChange={(e) => {setEndDate(e.target.value); setIsEndDateSelected(true);}}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  style={{ padding: "10px" }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
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
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
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
              {rows.slice(pg * rpg, pg *
                        rpg + rpg).map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.transactionType}
                    </TableCell>
                    <TableCell align="right">{row.senderAccountNo}</TableCell>
                    <TableCell align="right">{row.transactionType === "withdraw"?"...............":row.receiverAccountNo}</TableCell>
                    <TableCell align="right">{row.transactionAmount}</TableCell>
                    <TableCell align="right">{row.transactionDate}</TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
                  rowsPerPageOptions={[5, 10]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rpg}
                  page={pg}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}></TablePagination>
        </Box>
      </Container>
      <Snackbar anchorOrigin={{vertical:"top",horizontal:"right"}} open={errorOpen} autoHideDuration={6000} onClose={handleErrorClose}>
              <Alert
                onClose={handleErrorClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {errorMessage}
              </Alert>
            </Snackbar>
    </ThemeProvider>
  );
}
