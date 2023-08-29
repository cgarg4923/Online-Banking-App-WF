import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import mainLogo from "./wells.png";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#B04040",
    },
    secondary: {
      main: "#FFFFFF"
    },
  },
});

export default function HomePage() {

  const onUserClick = ()=>{
    var item = {
      isLoggedIn:false,
      role:"user"
    };
    window.sessionStorage.setItem("loginStatus",JSON.stringify(item));
  };

  const onAdminClick = ()=>{
    var item = {
      isLoggedIn:false,
      role:"admin"
    };
    window.sessionStorage.setItem("loginStatus",JSON.stringify(item));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar style={{justifyContent:"space-between"}}>
          <img src={mainLogo} style={{ width: "70px", padding: "2px" }} />
          <IconButton href="/AdminLogin" color="secondary" onClick={onAdminClick}>
          <AdminPanelSettingsIcon ></AdminPanelSettingsIcon>
          </IconButton>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="md">
            <Typography
              component="h2"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
              style={{
                fontFamily: "Bitter, serif",
              }}
            >
              <b>Welcome Back!</b>
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
              style={{
                fontFamily: "Nanum Myeongjo, serif",
              }}
            >
              Welcome to our premier online banking platform! Explore our
              user-friendly interface designed to empower you with easy access
              to account information, secure transactions, and personalized
              financial insights. Whether you're checking balances, transferring
              funds, paying bills, or planning for your future, our bank website
              provides a secure and efficient way to handle all your banking
              needs.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" href="/SignUp" onClick={onUserClick}>
                Create Profile
              </Button>
              <Button
                variant="outlined"
                style={{ padding: "10px" }}
                href="/login"
                onClick={onUserClick}
              >
                Login
              </Button>
            </Stack>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
