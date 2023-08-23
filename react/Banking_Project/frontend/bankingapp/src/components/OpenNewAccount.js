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
    phoneNumber:"",
    customerId:""
  });

  useEffect(() => {
    console.log("executed");
    var data = JSON.parse(window.sessionStorage.getItem("userCredentials"));
    setDetails({...details,phoneNumber:data["phoneNumber"], customerId: data["customerId"]});
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
      details.phoneNumber +
      Math.floor(1000 + Math.random() * 9000).toString() +
      typeOfAccount(accountType)
    ).toString();
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
        .then((e) => {
          alert("Successful!\nAccount Number: " + pno);
          navigate("/Dashboard");
        })
        .catch((e) => console.error(e));
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
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
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
