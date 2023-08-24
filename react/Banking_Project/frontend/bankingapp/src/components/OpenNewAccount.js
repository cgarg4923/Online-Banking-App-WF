import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import AppDrawer from "./Drawer";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#B04040",
    },
  },
});

export default function OpenNewAccount() {
  const [accountType, setAccountType] = useState("Savings");
  const [details,setDetails] = useState({
    customerId:""
  });
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage]=useState("Success")
  const [errorMessage,setErrorMessage]=useState("Error");

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
    console.log("executed");
    var data = JSON.parse(window.sessionStorage.getItem("userCredentials"));
    setDetails({...details, customerId: data["customerId"]});
  }, []);
  const baseURL =
    "http://localhost:9080/account/saveAccountData/" + details.customerId;
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [accountBalance, setAccountBalance] = useState("");
  const navigate = useNavigate();

  function validateForm() {
    return true;
  }

  function generateAccountNumber() {
    return (
      details.customerId.split("").reverse().join("").substring(0,details.customerId.length-1) +
      Math.floor(1000 + Math.random() * 9000).toString() +
      typeOfAccount(accountType)
    ).toString();
    //   details.phoneNumber +
    //   Math.floor(1000 + Math.random() * 9000).toString() +
    //   typeOfAccount(accountType)
    // ).toString();
  }

  function typeOfAccount(value) {
    if (value == "Savings") return 0;
    if (value == "Current") return 1;
    return 2;
  }
  const handleAccountBalance = (e) => {
    setAccountBalance(e.target.value);
  };
  const handleAccountType = (e) => {
    setAccountType(e.target.value);
  };
  const handlerSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
    } else {
      var pno = generateAccountNumber();
      axios
        .post(baseURL, {
          accountNo: pno,
          accountType: accountType,
          balance: accountBalance,
          status: "active"
        })
        .then((response) => {
          if (response.data==="Account created Successfully!") {
            setSuccessMessage("Successful! Account Number: " + pno)
            setSuccessOpen(true);
          } else {
            setErrorMessage(response.data)
            setErrorOpen(true);
          }
          // alert("Successful!\nAccount Number: " + pno);
          // navigate("/Dashboard");
        })
        .catch((e) => console.error(e));
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppDrawer/>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img style={{width:"100px"}} src={"https://cdn0.iconfinder.com/data/icons/finance-and-banking-color/64/Finance_deposit_account-1024.png"}></img>
          <Box
            component="form"
            sx={{ mt: 3, width: 500 }}
            onSubmit={handlerSubmit}
          >
            <Typography component="h1" variant="h5">
              Open New Account
            </Typography>
            <Grid>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="User ID"
                  type="text"
                  value={details.customerId}
                  margin="normal"
                  inputLabelProps={{ shrink: true }}
                  inputProps={{ readOnly: true }}
                ></TextField>
              </Grid>
            </Grid>
            <Grid>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  value={accountType}
                  onChange={handleAccountType}
                  label="Account Type"
                  margin="normal"
                  select
                  helperText="Please select your account type"
                >
                  <MenuItem value={"Savings"}>Savings</MenuItem>
                  <MenuItem value={"Current"}>Current</MenuItem>
                  <MenuItem value={"Loan"}>Loan</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Grid>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="Initial Account Balance"
                  type="number"
                  onChange={handleAccountBalance}
                  placeholder="Enter the minimum balance"
                  value={accountBalance}
                  margin="normal"
                ></TextField>
              </Grid>
            </Grid>
            <Grid>
              <Grid item sm={12}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
            <Grid container justifyContent="center" sx={{ mt: 2 }}>
              <Grid item>
                <Link href="#" variant="body2">
                  First Time User? Create New Account
                </Link>
              </Grid>
            </Grid>
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
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}