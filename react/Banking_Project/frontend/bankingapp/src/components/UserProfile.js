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
import axios from "axios";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#B04040",
    },
  },
});

export default function UserProfile({}) {

  var baseURL = "http://localhost:9080/customer/fetchCustomerProfile/";
  const [details, setDetails] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    fatherName: "",
    password: "",
    confirmPassword: "",
    currentAddressLine1: "",
    currentAddressLine2: "",
    currentCity: "",
    currentState: "",
    currentPincode: "",
    permanantAddressLine1: "",
    permanantAddressLine2: "",
    permanantCity: "",
    permanantState: "",
    permanantPincode: "",
    aadhar: "",
    grossAnnualIncome: 0,
    sourceOfIncome: "",
    occupationType: "",
  });

  

  React.useEffect(()=>{
    var data = window.sessionStorage.getItem("userCredentials");
    var customerId = JSON.parse(data)["customerId"];
    axios.get(baseURL+customerId).then((response)=>{
     var data1 = response.data[0];
     var address = data1["address"];
     console.log(data1);
      setDetails((prev) => {
        return { ...prev, ["firstName"]: data1["firstName"] };
      });
      setDetails((prev) => {
        return { ...prev, ["lastName"]: data1["lastName"] };
      });
      setDetails((prev) => {
        return { ...prev, ["middleName"]: data1["middleName"] };
      });
      setDetails((prev) => {
        return { ...prev, ["email"]: data1["emailId"] };
      });
      
      setDetails((prev) => {
        return { ...prev, ["occupationType"]: data1["occupationType"] };
      });
      
      setDetails((prev) => {
        return { ...prev, ["phoneNumber"]: data1["phoneNumber"] };
      });
      
      setDetails((prev) => {
        return { ...prev, ["aadhar"]: data1["aadharNumber"] };
      });
      
      setDetails((prev) => {
        return { ...prev, ["dateOfBirth"]: data1["dateOfBirth"] };
      });
      
      setDetails((prev) => {
        return { ...prev, ["currentAddressLine1"]: address[0]["addressLine1"] };
      });
      
      setDetails((prev) => {
        return { ...prev, ["currentAddressLine2"]: address[0]["addressLine2"] };
      });
      
      setDetails((prev) => {
        return { ...prev, ["currentState"]: address[0]["state"] };
      });
      
      setDetails((prev) => {
        return { ...prev, ["currentCity"]: address[0]["city"] };
      });
      
      setDetails((prev) => {
        return { ...prev, ["currentPincode"]: address[0]["pincode"] };
      });

      setDetails((prev) => {
        return { ...prev, ["permanantAddressLine1"]: address[1]["addressLine1"] };
      });
      
      setDetails((prev) => {
        return { ...prev, ["permanantAddressLine2"]: address[1]["addressLine2"] };
      });
      
      setDetails((prev) => {
        return { ...prev, ["permanantState"]: address[1]["state"] };
      });
      
      setDetails((prev) => {
        return { ...prev, ["permanantCity"]: address[1]["city"] };
      });
      
      setDetails((prev) => {
        return { ...prev, ["permanantPincode"]: address[1]["pincode"] };
      });
      setDetails((prev) => {
        return { ...prev, ["permanantPincode"]: address[1]["pincode"] };
      });
      
    }).catch((error)=>{console.error(error)});
  },[]);

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
      price: details.occupationType,
    },
    {
      name: "Date of Birth",
      price: details.dateOfBirth,
    },
  ];

  const addresses = [
    details.currentAddressLine1,
    details.currentAddressLine2,
    details.currentCity,
    details.currentState,
    details.currentPincode,
  ];
  const paddresses = [
    details.permanantAddressLine1,
    details.permanantAddressLine2 ,
    details.permanantCity,
    details.permanantState,
    details.permanantPincode,
   
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
                    />
                    <Typography variant="body2">
                      {product.price === "" ? "-" : product.price}
                    </Typography>
                  </ListItem>
                ))}
              </List>
              <Grid container spacing={2}>
                <Grid item container direction="column" xs={12} sm={6}>
                  <Typography variant="h7" gutterBottom sx={{ mt: 2 }} style={{textAlign:"left"}}>
                    <b>Current Address</b>
                  </Typography>
                  <Typography gutterBottom style={{textAlign:"left",paddingRight:"4px"}}>{addresses.join(", ")}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                  <Typography variant="h7" gutterBottom sx={{ mt: 2 }} style={{textAlign:"right"}}>
                    <b>Permanent Address</b>
                  </Typography>
                  <Typography gutterBottom style={{textAlign:"right",paddingLeft:"4px"}}>{paddresses.join(", ")}</Typography>
                </Grid>
              </Grid>     
            </React.Fragment>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
