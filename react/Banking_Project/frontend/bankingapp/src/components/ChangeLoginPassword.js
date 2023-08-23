import React from "react";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Container, Grid, TextField, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import AppDrawer from "./Drawer";
import axios from "axios";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#B04040",
    },
  },
});

export default function ChangeLoginPassword() {
  
  const [loginPassword, setLoginPassword] = useState("");
  const [confirmLoginPassword, setConfirmLoginPassword] = useState("");
  const [customerId,setCustomerId] = useState("");
  var baseURL =
      "http://localhost:9080/customer/updatePassword/";

  const handleConfirmLoginPassword = (e) => {
    setConfirmLoginPassword(e.target.value);
  };

  const handleLoginPassword = (e) => {
    setLoginPassword(e.target.value);
  };

  function validateForm(){
    if(loginPassword.length < 8){
      alert("Password must be atleast 8 characters long");
      setLoginPassword("");
      setConfirmLoginPassword("");
      return false;
    }
    if (loginPassword != confirmLoginPassword) {
      alert("Password does not match!");
      setConfirmLoginPassword("");
      return false;
    }
    return true;
  }
  

  const handleSubmit= (e) =>{
    e.preventDefault();
    if(!validateForm()) return;
    var data = JSON.parse(window.sessionStorage.getItem("userCredentials"));
    setCustomerId(data["customerId"]);
    baseURL = baseURL+data["customerId"]+"/"+loginPassword;
    axios
      .put(baseURL)
      .then((response) => {
        alert(response.data);
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
            src={
              "https://cdn-icons-png.flaticon.com/512/6357/6357048.png"
            }
          ></img>
          <Box
           
            sx={{ mt: 3, width: 500 }}
           
          >
            <form  onSubmit={handleSubmit}>
            <Typography
              component="h1"
              variant="h5"
              style={{
                fontFamily: "Nanum Myeongjo, serif",
                marginBottom: "15px",
              }}
            >
              <b>Change Password</b>
            </Typography>
            <Grid>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  required
                  label="Login Password"
                  type="password"
                  placeholder="Enter New Login Password"
                  onChange={handleLoginPassword}
                  value={loginPassword}
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
                  label="Confirm Login Password"
                  type="password"
                  placeholder="Confirm New Login Password"
                  onChange={handleConfirmLoginPassword}
                  value={confirmLoginPassword}
                  margin="normal"
                  helperText={
                    loginPassword != confirmLoginPassword
                      ?  "Password Does Not Match"
                      : ""
                  }
                  error={loginPassword != confirmLoginPassword}
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
            </form>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
