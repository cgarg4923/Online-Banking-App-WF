import React from "react";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Container, Grid, TextField, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import AppDrawer from "./Drawer";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#B04040",
    },
  },
});

export default function ChangeLoginPassword() {
  //const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [confirmLoginPassword, setConfirmLoginPassword] = useState("");
  const [customerId,setCustomerId] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage]=useState("Success")
  const [errorMessage,setErrorMessage]=useState("Error");
  const navigate = useNavigate();

  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorOpen(false);
  };

  const handleSuccessClose = (event, reason) => {
   

    setSuccessOpen(false);
    navigate("/Dashboard");
  };
  var baseURL =
      "http://localhost:9080/customer/updatePassword/";

  const handleConfirmLoginPassword = (e) => {
    setConfirmLoginPassword(e.target.value);
  };

  const handleLoginPassword = (e) => {
    setLoginPassword(e.target.value);
  };
  function validateForm() {
    if (loginPassword != confirmLoginPassword) {
      setErrorMessage("Please Fill in the Forms Details Correctly")
      setErrorOpen(true);
      document.getElementById("confirmPassword").focus();
      return false;
    }
    return true;
  }
  
  const handleSubmit= (e) =>{
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    var data = JSON.parse(window.sessionStorage.getItem("userCredentials"));
    setCustomerId(data["customerId"]);
    baseURL = baseURL+data["customerId"]+"/"+loginPassword;
    axios
      .put(baseURL)
      .then((response) => {
        if (response.data==="Passsword updated Succewssfully") {
          setSuccessMessage(response.data)
          setSuccessOpen(true);
        } else {
          setErrorMessage(response.data)
          setErrorOpen(true);
        }
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
            style={{ width: "100px" }}
            src={
              "https://cdn-icons-png.flaticon.com/512/6357/6357048.png"
            }
          ></img>
          <Box
           component="form"
           sx={{ mt: 3, width: '50%' }}
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
                  helperText={
                    (loginPassword.length < 8) |
                    (loginPassword.length > 16)
                      ? "Password must be between 8-16 characters and \nMust contain at least one  number and one uppercase and lowercase letter"
                      : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/.test(
                          loginPassword
                        )
                      ? ""
                      : "Password Must contain at least one  number and one uppercase and lowercase letter"
                  }
                  inputProps={{
                    pattern: "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}",
                    title: "Enter a Valid Password",
                  }}
                  // style={{ paddingLeft: "10px", paddingRight: "10px" }}
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
                  id="confirmPassword"
                  onChange={handleConfirmLoginPassword}
                  value={confirmLoginPassword}
                  margin="normal"
                  helperText={
                    loginPassword != confirmLoginPassword
                      ?  "Password Does Not Match"
                      : ""
                  }
                  error={loginPassword != confirmLoginPassword}
                  // style={{ paddingLeft: "10px", paddingRight: "10px" }}
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
            <Snackbar anchorOrigin={{vertical:"top",horizontal:"right"}} open={errorOpen} autoHideDuration={6000} onClose={handleErrorClose}>
              <Alert
                onClose={handleErrorClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {errorMessage}
              </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{vertical:"top",horizontal:"right"}} open={successOpen} onClose={handleSuccessClose} autoHideDuration={6000}>
              <Alert
                onClose={handleSuccessClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                {successMessage}
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}