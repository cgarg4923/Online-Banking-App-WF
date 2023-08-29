import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useState } from "react";
import { Container, Grid, Typography, TablePagination } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import AdminAppDrawer from "./AdminDrawer";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import { Snackbar,Alert } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#B04040",
    },
  },
});
function createData(transactionType, senderAccountNo, receiverAccountNo, transactionAmount, transactionDate, type) {
  return {transactionType, senderAccountNo, receiverAccountNo, transactionAmount, transactionDate, type };
}

export default function SearchAccount() {

    const baseURLStatus = "http://localhost:9080/admin/updateAccountStatus/"
  const [transactions, setTransactions] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [accountDetails, setAccountDetails] = useState({})
  const [status,setStatus] = useState("");
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(3);
  const [isClicked,setIsClicked] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage,setErrorMessage]=useState("Error");
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage]=useState("Success");
  
  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorOpen(false);
  };
  const handleSuccessClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessOpen(false);
  };
  function handleChangePage(event, newpage) {
    setpg(newpage);
  }
  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchClick = () => {
    handleSearch();
  };
  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }

const handleActivation = ()=>{
    axios.put(baseURLStatus+searchText+"/active").then((response)=>{
      setSuccessMessage(response.data);
      setSuccessOpen(true);
      setStatus("active");}).catch((error)=>{console.error(error)});

};

const handleDeactivation = ()=>{
    axios.put(baseURLStatus+searchText+"/disabled").then((response)=>{
      setSuccessMessage(response.data);
      setSuccessOpen(true);
      setStatus("disabled");}).catch((error)=>{console.error(error)});

};

  let rows = [];

  function handleSearch () {
    rows = [];
    setTransactions([]);
    setAccountDetails({});
    const baseURLTrans = `http://localhost:9080/admin/fetchStatement/${searchText}`;
    const baseURLDetails = `http://localhost:9080/account/fetchAccountProfile/${searchText}`;
    axios.get(baseURLTrans).then((response) => {
      if (typeof (response.data) == "string") {
      } else {
        setTransactions(response.data)
      }
    }).catch((error) => {
      console.error(error) });

    axios.get(baseURLDetails).then((response) => {
      if (typeof (response.data) == "string") {
      } else {
        setAccountDetails(response.data[0]);
        setStatus(response.data[0].status);
        setIsClicked(true);
        setSelectedAccount(searchText);
      }
      
    }).catch((error) => {
      setErrorMessage("No Account found. Please enter a valid Account No.");
      setErrorOpen(true);
      setIsClicked(false);
      console.error(error) 
    });

  };
  transactions.map(
    (transaction) => {
      if (transaction.senderAccountNo === selectedAccount) {
        rows.push(createData(transaction.transactionType, transaction.senderAccountNo, transaction.receiverAccountNo, transaction.transactionAmount, transaction.transactionDate, "DE"))
      } else {
        rows.push(createData(transaction.transactionType, transaction.senderAccountNo, transaction.receiverAccountNo, transaction.transactionAmount, transaction.transactionDate, "CR"))
      };
    });
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
      <AdminAppDrawer />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper
          component="form"
          sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
          style={{ marginTop: "100px" }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Account Details"
            inputProps={{ "aria-label": "search customer" }}
            onChange={handleSearchTextChange}
            value={searchText}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={handleSearchClick}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
        {isClicked && <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop:"50px"
        }}>
            <div style={{marginBottom:"30px"}}>
         {status === "active" && accountDetails.balance < 1000 && <Button variant="contained" onClick={handleDeactivation}>Disable</Button>}
         {status === "disabled" && <Button variant="contained" onClick={handleActivation}>Activate</Button>}
         </div>
          <Grid sx={{ marginBottom: 2 }} container spacing={2}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <Typography primary variant='h6' sx={{ padding: 2, paddingRight: 10, color: "primary.main" }}>Account Balance</Typography>
                <Typography primary variant='h5' sx={{ paddingLeft: 2, paddingBottom: 2 }}>{accountDetails.balance}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <Typography primary variant='h6' sx={{ padding: 2, paddingRight: 10, color: "primary.main" }}>Account Number</Typography>
                <Typography primary variant='h5' sx={{ paddingLeft: 2, paddingBottom: 2 }}>{accountDetails.accountNo}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <Typography primary variant='h6' sx={{ padding: 2, paddingRight: 10, color: "primary.main" }}>Account Type</Typography>
                <Typography primary variant='h5' sx={{ paddingLeft: 2, paddingBottom: 2 }}>{accountDetails.accountType}</Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={12}>
              <Paper elevation={3}>
                <Typography inline align="left" primary variant='h6' sx={{ padding: 2, color: "primary.main" }}>Recent Transactions</Typography>
                <TableContainer sx={{ paddingLeft: 2, paddingRight: 2 }}>
                  <Table aria-label="simple table">
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
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
                  rowsPerPageOptions={[3, 6]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rpg}
                  page={pg}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}></TablePagination>
              </Paper>
            </Grid>
          </Grid>
        </Box>}
      </Container>
      <Snackbar anchorOrigin={{vertical:"bottom",horizontal:"left"}} open={successOpen} autoHideDuration={6000} onClose={handleSuccessClose}>
              <Alert
                onClose={handleSuccessClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                {successMessage}
              </Alert>
            </Snackbar>
      <Snackbar anchorOrigin={{vertical:"bottom",horizontal:"left"}} open={errorOpen} autoHideDuration={6000} onClose={handleErrorClose}>
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