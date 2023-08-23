import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppDrawer from "./Drawer";
import axios from "axios";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Grid from "@mui/material/Grid";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#B04040",
    },
  },
});

const FundTransferComponent = () => {
  const [paymentMode, setPaymentMode] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [customerId,setCustomerId] = useState("");

  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");

  const [beneficiaryAccounts, setBeneficiaryAccounts] = useState([]);
  const [selectedBeneficiaryAccount, setSelectedBeneficiaryAccount] =
    useState("");

  useEffect(() => {
    var data = JSON.parse(window.sessionStorage.getItem("userCredentials"));
    const baseURL1 =
      "http://localhost:9080/customer/fetchCustomerAccounts/" + data["customerId"];
    axios
      .get(baseURL1)
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    const baseURL2 = 'http://localhost:9080/customer/fetchBenificiary/' + data["customerId"];
    axios.get(baseURL2).then((response) => { setBeneficiaryAccounts(response.data) }).catch((error) => { console.error(error) });
  }, []);

  function getSqlDate() {
    var pad = function (num) {
      return ("00" + num).slice(-2);
    };
    var date = new Date();
    return (
      date.getUTCFullYear() +
      "-" +
      pad(date.getUTCMonth() + 1) +
      "-" +
      pad(date.getUTCDate())
    );
  }

  const handlePaymentMode = (e) => {
    setPaymentMode(e.target.value);
  };

  const handleSelectAccount = (e) => {
    setSelectedAccount(e.target.value);
    console.log("hello");
  };

  const handleSelectBeneficiaryAccount = (e) => {
    setSelectedBeneficiaryAccount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const transactionTime = getSqlDate();

    const transferInfo = {
      selectedAccount,
      selectedBeneficiaryAccount,
      amount,
      paymentMode,
      remark,
      transactionTime,
    };
    const baseURL = "http://localhost:9080/account/fundTransfer";
    axios.put(baseURL, {
      senderAccountNo: selectedAccount,
      receiverAccountNo: selectedBeneficiaryAccount,
      transactionDate: transactionTime,
      transactionType: paymentMode,
      transactionAmount: parseFloat(amount)
    }).then((response) => { alert(response.data);}).catch((error) => { console.error(error) });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <AppDrawer />
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20%" }}>
          <Box
            sx={{
              mt: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              style={{ fontFamily: "Nanum Myeongjo, serif" }}
            >
              <b>Initiate Payment</b>
            </Typography>
            <form
              onSubmit={handleSubmit}
              style={{ width: "80%", marginTop: 20 }}
            >
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
              <Grid container sm={12} alignItems="flex-start">
                <Grid item>
                  <TextField
                    fullWidth
                    value={selectedBeneficiaryAccount}
                    onChange={handleSelectBeneficiaryAccount}
                    label="Choose Beneficiary Account"
                    select
                    helperText="Choose a Beneficiary"
                    style={{ padding: "10px", width: "320px" }}
                  >
                    {beneficiaryAccounts.map((account, index) => (
                      <MenuItem value={account}>{account}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item>
                  <Fab size="small" color="primary" aria-label="add" href="/AddBeneficiary">
                    <AddIcon />
                  </Fab>
                </Grid>
              </Grid>
              <TextField
                label="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                required
                style={{ padding: "10px" }}
              />
              <TextField
                fullWidth
                value={paymentMode}
                onChange={handlePaymentMode}
                label="Payment Mode"
                select
                helperText="Please select payment mode"
                style={{ padding: "10px" }}
              >
                <MenuItem value={"NEFT"}>NEFT</MenuItem>
                <MenuItem value={"RTGS"}>RTGS</MenuItem>
                <MenuItem value={"IMPS"}>IMPS</MenuItem>
              </TextField>
              <TextField
                label="Remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                fullWidth
                style={{ padding: "10px" }}
              />
              <Box sx={{ mt: 2 }}>
                <Typography>
                  Transaction Time: {new Date().toLocaleDateString()}
                </Typography>
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                style={{ padding: "10px", width: "90px" }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default FundTransferComponent;
