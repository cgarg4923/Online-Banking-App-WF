import React from "react";
import {
  Container,
  Paper,
  Typography,
  List,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  ListItemButton,
  Box,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountStatement from "./AccountStatement";
import { useState } from "react";
import FundTransfer from "./FundTransfer";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
// import img from "./wells_fargo_logo.jpg";
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#B04040",
    },
  },
});
const Dashboard = () => {
  const [value, setValue] = useState(0);
  function focusComponent() {
    if (value == 0) return <>
      <div>
        <Typography
          variant="h6"
          style={{ flexGrow: 1, textAlign: "left", padding: "20px", fontFamily: "Bitter, serif", }}>
          <b>Hi, Welcome Back!</b>
        </Typography>
        <img src="https://logosmarcas.net/wp-content/uploads/2020/11/Wells-Fargo-Emblema.png"
          style={{ width: "350px" }}>
        </img>
      </div>
    </>
    else if (value == 1) return <div></div>
    else if (value == 2) return <div></div>
    else return <AccountStatement />
  }
  const handleLogout = () => {
    // Perform logout action and redirect to login page
    //history.push('/login');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div style={{ display: "flex" }}>
        {/* Side Panel */}
        <Paper elevation={3} style={{ width: "200px", padding: "10px", height: "100vh" }}>
          <Box>
            <List>
              <ListItemButton button onClick={() => { setValue(1) }}>
                <ListItemText primary="Account Details" />
              </ListItemButton>
              <ListItemButton button onClick={() => { setValue(2) }}>
                <ListItemText primary="Account Salary" />
              </ListItemButton>
              <ListItemButton button href="/FundTransfer">
                <ListItemText primary="Funds Transfer" href="/FundTransfer" />
              </ListItemButton>
              <ListItemButton button onClick={() => { setValue(3) }}>
                <ListItemText primary="Account Statement" />
              </ListItemButton>
              <ListItemButton button href="/Withdraw">
                <ListItemText primary="Withdraw" />
              </ListItemButton>
            </List>
          </Box>
        </Paper>

        {/* Main Content */}
        <div style={{ flexGrow: 1, paddingTop: "20px" }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                Dashboard
              </Typography>
              <IconButton onClick={handleLogout} color="inherit">
                <LogoutIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Container style={{ paddingTop: "20px" }}>
            {
              focusComponent()
            }
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
