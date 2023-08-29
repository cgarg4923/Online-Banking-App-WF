import React, { useEffect, useState } from "react";
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
import axios from "axios";
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

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [customerId,setCustomerId] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [successMessage, setSuccessMessage]=useState("Success")
  const [errorMessage,setErrorMessage]=useState("Error");
  const [warningMessage,setWarningMessage]=useState("Warning");
  const navigate = useNavigate();

  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorOpen(false);
  };

  const handleSuccessClose = (event, reason) => {
    navigate("/Dashboard");
  };


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
        console.error(error.response.status+ " " +error.response.data.message)
      });
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

  const handleSelectAccount = (e) => {
    setSelectedAccount(e.target.value);
  };

function validateForm(){
  if(amount<0){
    setErrorMessage("Amount cannot be negative");
    setErrorOpen(true);
    setAmount(0);
    return false;
  }
  return true;
}

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!validateForm()) return;
    const baseURLAccount = "http://localhost:9080/customer/withdraw";
    const transactionTime = getSqlDate();
    axios
      .put(baseURLAccount, {
        senderAccountNo: selectedAccount,
        receiverAccountNo: selectedAccount,
        transactionAmount: parseFloat(amount),
        transactionType: "withdraw",
        transactionDate: transactionTime,
      })
      .then((response) => {
        if (response.data==="Transaction successful  !!!") {
          setSuccessMessage(response.data);
          setSuccessOpen(true);
        } else if(response.data==="Transaction Successful  !!!\nNOTICE : Your balance is dropped below the Minimum Account Balance limit !") {
          setWarningMessage(response.data)
          setWarningOpen(true);
        } else {
          setErrorMessage(response.data);
          setErrorOpen(true);
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data.statusCode +" "+error.response.data.message)
        setErrorOpen(true);;
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
        <AppDrawer/>
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "20px", marginTop: "40%" }}>
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
              <b>Withdraw</b>
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
              <TextField
                label="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                type="number"
                required
                style={{ padding: "10px" }}
              />

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
            <Snackbar anchorOrigin={{vertical:"top",horizontal:"right"}} open={errorOpen} autoHideDuration={6000} onClose={handleErrorClose}>
              <Alert
                onClose={handleErrorClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {errorMessage}
              </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{vertical:"top",horizontal:"right"}} open={successOpen} onClose={handleSuccessClose}>
              <Alert
                onClose={handleSuccessClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                {successMessage+". Close to Redirect."}
              </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{vertical:"top",horizontal:"right"}} open={warningOpen} onClose={handleSuccessClose}>
              <Alert
                onClose={handleSuccessClose}
                severity="warning"
                sx={{ width: "100%" }}
              >
                {warningMessage+". Close to Redirect."}
              </Alert>
            </Snackbar>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Withdraw;
