import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import { Container, TextField, Grid, Typography, TablePagination } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import AdminAppDrawer from "./AdminDrawer";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

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
  const [transactions, setTransactions] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [accountDetails, setAccountDetails] = useState({})
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(3);
  const [isClicked,setIsClicked] = useState(true);
  const [searchText, setSearchText] = useState("");

  function handleChangePage(event, newpage) {
    setpg(newpage);
  }
  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchClick = () => {
    console.log(searchText);
    handleSearch();
  };
  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }
  let rows = [];

  function handleSearch () {
    rows = [];
    setTransactions([]);
    setAccountDetails({});
    console.log(selectedAccount);
    const baseURLTrans = `http://localhost:9080/admin/fetchStatement/${searchText}`;
    const baseURLDetails = `http://localhost:9080/account/fetchAccountProfile/${searchText}`;
    axios.get(baseURLTrans).then((response) => {
      if (typeof (response.data) == "string") {
      } else {
        setTransactions(response.data)
      }
    }).catch((error) => { console.error(error) });

    axios.get(baseURLDetails).then((response) => {
      if (typeof (response.data) == "string") {
      } else {
        setAccountDetails(response.data[0])
      }
      setIsClicked(true);
      setSelectedAccount(searchText);
    }).catch((error) => { console.error(error) });

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
          marginTop:"100px"
        }}>
         
          <Grid sx={{ marginBottom: 2 }} container spacing={2}>
            <Grid item sm={4}>
              <Paper elevation={3} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <Typography primary variant='h6' sx={{ padding: 2, paddingRight: 10, color: "primary.main" }}>Account Balance</Typography>
                <Typography primary variant='h5' sx={{ paddingLeft: 2, paddingBottom: 2 }}>{accountDetails.balance}</Typography>
              </Paper>
            </Grid>
            <Grid item sm={4}>
              <Paper elevation={3} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <Typography primary variant='h6' sx={{ padding: 2, paddingRight: 10, color: "primary.main" }}>Account Number</Typography>
                <Typography primary variant='h5' sx={{ paddingLeft: 2, paddingBottom: 2 }}>{accountDetails.accountNo}</Typography>
              </Paper>
            </Grid>
            <Grid item sm={4}>
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
                            <TableCell align="right">{row.receiverAccountNo}</TableCell>
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
    </ThemeProvider>
  );
}