import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Snackbar } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#B04040",
    },
  },
});

export default function AdminLogin() {
  const baseURL = "http://localhost:9080/admin/validateAdminData";
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Error");
  const [successMessage, setSuccessMessage] = useState("Success");
  const navigate = useNavigate();

  function validateForm() {
    if (name.length == 0 || password.length == 0) {
      alert("Field Cannot be Empty");
      return false;
    }
    return true;
  }
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!validateForm()) return;
    axios
      .post(baseURL, {
        customerId: name,
        password: password,
      })
      .then(function (response) {
        if (response.data === "LOGGED IN SUCCESSFULLY !!") {
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
    isLoggedIn: true,
    role: "admin"
  };
  window.sessionStorage.setItem("loginStatus", JSON.stringify(item));
  navigate("/AdminDashboard");
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
            src="https://lh3.googleusercontent.com/tRxsDmT9Pzyy5jQ36Q0PdvXHyFg9APxh4iu3ad3g_pO7rXKo7RnIUv6jodl-s3Zk8w=s180"
            sx={{ width: 70, height: 70, m: 1 }}
          />
          <Typography component="h1" variant="h5">
            Admin Login
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={errorOpen} autoHideDuration={6000} onClose={handleErrorClose}>
              <Alert
                onClose={handleErrorClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {errorMessage}
              </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={successOpen} onClose={handleSuccessClose}>
              <Alert
                onClose={handleSuccessClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                {successMessage + ". Close to Redirect."}
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Grid>
    </Grid>
  </ThemeProvider>
);
}
