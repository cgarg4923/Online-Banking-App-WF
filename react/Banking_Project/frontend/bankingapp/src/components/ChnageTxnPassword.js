import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Container, Grid, TextField, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import AppDrawer from "./Drawer";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#B04040",
    },
  },
});

export default function ChangeTxnPassword() {

  const [txnPassword, setTxnPassword] = useState("");
  const [confirmTxnPassword, setConfirmTxnPassword] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");

  var customerId;

  const handleConfirmTxnPassword = (e) => {
    setConfirmTxnPassword(e.target.value);
  };

  const handleTxnPassword = (e) => {
    setTxnPassword(e.target.value);
  };

  const handleSelectAccount = (e) => {
    setSelectedAccount(e.target.value);
  };


  useEffect(() => {
    var dat = window.sessionStorage.getItem("userCredentials");
    var data = JSON.parse(dat);
    customerId = data["customerId"];
    const baseURL1 =
      "http://localhost:9080/customer/fetchCustomerAccounts/" + customerId;
    axios
      .get(baseURL1)
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit=(e)=> {
    e.preventDefault();
    const baseURL =
      "http://localhost:9080/customer/fetchCustomerAccounts/" + customerId;
    axios
      .put(baseURL, { password: txnPassword })
      .then((response) => {
        alert("Password Changed Successfully");
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
        <AppDrawer />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            style={{ width: "150px" }}
            src={"https://cdn-icons-png.flaticon.com/512/6357/6357048.png"}
          ></img>
          <Box
            component="form"
            sx={{ mt: 3, width: 500 }}
            onSubmit={handleSubmit}
          >
            <Typography
              component="h1"
              variant="h5"
              style={{
                fontFamily: "Nanum Myeongjo, serif",
                marginBottom: "15px",
              }}
            >
              <b>Change Transaction Password</b>
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
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  required
                  label="Transaction Password"
                  type="password"
                  placeholder="Enter New Transaction Password"
                  onChange={handleTxnPassword}
                  value={txnPassword}
                  margin="normal"
                  style={{ paddingLeft: "10px", paddingRight: "10px" }}
                ></TextField>
              </Grid>
            </Grid>
            <Grid>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  required
                  label="Confirm Transaction Password"
                  type="password"
                  placeholder="Confirm New Transaction Password"
                  onChange={handleConfirmTxnPassword}
                  value={confirmTxnPassword}
                  margin="normal"
                  helperText={
                    txnPassword != confirmTxnPassword
                      ? "Password Does Not Match"
                      : ""
                  }
                  error={txnPassword != confirmTxnPassword}
                  style={{ paddingLeft: "10px", paddingRight: "10px" }}
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
                  style={{ width: "150px" }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
