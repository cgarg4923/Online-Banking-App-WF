import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import AppDrawer from "./Drawer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import profile from "./profile.png";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#B04040",
    },
  },
});

export default function UserProfile({}) {
  const [details, setDetails] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    paddress1: "",
    paddress2: "",
    pcity: "",
    pstate: "",
    pzip: "",
    aadhar: "",
    occupation: "",
    dateOfBirth: "",
  });

  const products = [
    {
      name: "Name",
      price:
        details.firstName + " " + details.middleName + " " + details.lastName,
    },
    {
      name: "Email",
      price: details.email,
    },
    {
      name: "Phone Number",
      price: details.phoneNumber,
    },
    {
      name: "Aadhar Number",
      price: details.aadhar,
    },
    {
      name: "Occupation",
      price: details.occupation,
    },
    {
      name: "Date of Birth",
      price: details.dateOfBirth,
    },
  ];

  const addresses = [
    details.address1,
    details.address2,
    details.city,
    details.state,
    details.zip,
    details.country,
  ];
  const paddresses = [
    details.paddress1 === "" ? details.address1 : details.paddress1,
    details.paddress2 === "" ? details.address2 : details.paddress2,
    details.pcity === "" ? details.city : details.pcity,
    details.pstate === "" ? details.state : details.pstate,
    details.pzip === "" ? details.zip : details.pzip,
    details.pcountry === "" ? details.country : details.pcountry,
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: 15 }}>
        <AppDrawer />
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Box component="form">
            <React.Fragment>
              <img
                src={profile}
                style={{ width: "100px", marginBottom: "20px" }}
              ></img>
              <Typography
                variant="h5"
                gutterBottom
                style={{
                  fontFamily: "Nanum Myeongjo, serif",
                  marginBottom: "30px",
                }}
              >
                <b>Profile</b>
              </Typography>
              <List disablePadding>
                {products.map((product) => (
                  <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                    <ListItemText
                      primary={product.name}
                      secondary={product.desc}
                    />
                    <Typography variant="body2">
                      {product.price === "" ? "-" : product.price}
                    </Typography>
                  </ListItem>
                ))}
              </List>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Current Address
                  </Typography>
                  <Typography gutterBottom>{addresses.join(", ")}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Permanent Address
                  </Typography>
                  <Typography gutterBottom>{paddresses.join(", ")}</Typography>
                </Grid>
              </Grid>
            </React.Fragment>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
