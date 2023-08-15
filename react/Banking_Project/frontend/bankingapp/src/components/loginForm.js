import { useState } from "react";
import Button from "@mui/material/Button";
import { Container, Grid, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "@mui/material/Link";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#FF0000",
    },
  },
});
export default function LoginForm() {
  const baseURL = "http://localhost:9080/validateCustomerData";
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
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
        alert(response.data);
        var item = {
          customerId: name,
          password: password,
        };
        window.sessionStorage.setItem("userCredentials", JSON.stringify(item));
        console.log("success");
        console.log(window.sessionStorage.getItem("userCredentials"));
      });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container class="form" component="main">
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
            class="innerBox"
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Typography component="h1" variant="h5">
              Login to your Account
            </Typography>
            <Grid>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="User ID"
                  type="text"
                  placeholder="User ID"
                  value={name}
                  onChange={handleName}
                  required
                  margin="normal"
                ></TextField>
              </Grid>
            </Grid>
            <Grid>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  required
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={handlePassword}
                  value={password}
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
                  Login
                </Button>
              </Grid>
            </Grid>
            <Grid container justifyContent="center" sx={{ mt: 2 }}>
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  First Time User? Create New Profile
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
