import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#B04040",
    },
  },
});

export default function Login() {
  const baseURL = "http://localhost:9080/customer/validateCustomerData";
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage,setErrorMessage]=useState("Error");
  const [successMessage,setSuccessMessage]=useState("Success");
  const navigate = useNavigate();

  function validateForm() {
    if (name.length == 0) {
      alert("Name Field Cannot be Empty");
      return;
    }
    setName("");
    setPassword("");
  }
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(baseURL, {
        customerId: name,
        password: password,
      })
      .then(function (response) {
        //alert(response.data);
        if (response.data==="LOGGED IN SUCCESSFULLY !!") {
          setSuccessMessage(response.data)
          setSuccessOpen(true);
        } else {
          setErrorMessage(response.data)
          setErrorOpen(true);
        }
      });
  };
  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorOpen(false);
  };

  const handleSuccessClose = (event, reason) => {
    var item = {
      isLoggedIn:true,
      role:"user"
    };
    window.sessionStorage.setItem("loginStatus",JSON.stringify(item));
    item = {
      customerId: name,
    };
    window.sessionStorage.setItem("userCredentials", JSON.stringify(item));
    navigate("/Dashboard");
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://www.simtrade.fr/blog_simtrade/wp-content/uploads/2022/11/img_Wells_Fargo_logo.png)",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#d81f29",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Travis Howard"
              src="https://www.mapleflake.com/images/login-icon.png"
              sx={{ width: 70, height: 70, m: 1 }}
            />
            <Typography component="h1" variant="h5">
              Login to your Account
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="User ID"
                type="text"
                placeholder="User ID"
                value={name}
                onChange={handleName}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                required
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={handlePassword}
                value={password}
                margin="normal"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/SignUp" variant="body2">
                    {"Don't have an account? Create One"}
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
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}