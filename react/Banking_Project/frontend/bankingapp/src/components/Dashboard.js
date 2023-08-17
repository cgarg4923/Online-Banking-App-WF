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
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountStatement from "./AccountStatement";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import AppDrawer from "./Drawer";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#B04040",
    },
  },
});
const Dashboard = () => {

  return (
    <ThemeProvider theme={defaultTheme}>
      <AppDrawer />
      <Typography
        component="h3"
        variant="h4"
        align="left"
        color="text.primary"
        gutterBottom
        style={{
          "fontFamily": "Bitter, serif",
          marginTop:"100px",
          marginLeft:"100px"
        }}
      >
        <b>Hi, Welcome!</b>
      </Typography>
      <img style={{ width: "500px"}} src={"https://logosmarcas.net/wp-content/uploads/2020/11/Wells-Fargo-Emblema.png"}></img>
    </ThemeProvider>
  );
};

export default Dashboard;
