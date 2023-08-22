import React from "react";
import { Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import AppDrawer from "./Drawer";
import { useEffect } from "react";
import AdminAppDrawer from "./AdminDrawer";

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
          fontFamily: "Bitter, serif",
          marginTop: "100px",
          marginLeft: "100px",
        }}
      >
        <b>Hi, Welcome!</b>
       
      </Typography>
      <img
        style={{ width: "500px", marginTop: "8%" }}
        src={
          "https://logosmarcas.net/wp-content/uploads/2020/11/Wells-Fargo-Emblema.png"
        }
      ></img>
    </ThemeProvider>
  );
};

export default Dashboard;
