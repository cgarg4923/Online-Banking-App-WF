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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import img from "./wells_fargo_logo.jpg";

const Dashboard = () => {
  const handleLogout = () => {
    // Perform logout action and redirect to login page
    //history.push('/login');
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Side Panel */}
      <Paper elevation={3} style={{ width: "240px", padding: "10px" }}>
        <Box style={{ height: "1vh" }}>
          <List>
            <ListItemButton button href="/FundTransfer">
              <ListItemText primary="Account Details" />
            </ListItemButton>
            <ListItemButton button>
              <ListItemText primary="Account Salary" />
            </ListItemButton>
            <ListItemButton button>
              <ListItemText primary="Funds Transfer" />
            </ListItemButton>
            <ListItemButton button>
              <ListItemText primary="Account Statement" />
            </ListItemButton>
          </List>
        </Box>
      </Paper>

      {/* Main Content */}
      <div style={{ flexGrow: 1, padding: "20px" }}>
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
        <Typography variant="h6" style={{ flexGrow: 1 ,textAlign:"left"}}>
          Hi, Welcome Back!
        </Typography>
        <Container  style={{ paddingTop: "20px" }}>
          <img
            src={img}
            alt="Wells Fargo"
            style={{ width: "100%",opacity:"0.4"}}
          />
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
