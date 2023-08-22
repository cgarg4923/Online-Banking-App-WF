import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AdminAppDrawer from "./AdminDrawer";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Container from "@mui/material/Container";
import axios from "axios";
import profile from "./profile.png";
import Button from "@mui/material/Button";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#B04040",
    },
  },
});

export default function SearchCustomer() {

  const [searchText, setSearchText] = useState("");
  const [isClicked, setIsClicked] = useState(false);
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
    status: "active"
  });

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchClick = () => {
    console.log(searchText);
    fetchUserData();
  };

  function fetchUserData() {
    var baseURL = "http://localhost:9080/customer/fetchCustomerProfile/";
    axios.get(baseURL + searchText).then((response) => {
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
      setDetails((prev) => {
        return { ...prev, ["sourceOfIncome"]: data1["sourceOfIncome"] };
      });
      setDetails((prev) => {
        return { ...prev, ["grossAnnualIncome"]: data1["grossAnnualIncome"] };
      });
      // setDetails((prev) => {
      //   return { ...prev, ["status"]: data1["status"] };
      // });
      setIsClicked(true);

    }).catch((error) => { console.error(error) });
  }

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
    {
      name: "Source of Income",
      price: details.sourceOfIncome,
    },
    {
      name: "Gross Annual Income",
      price: details.grossAnnualIncome,
    },
    {
      name: "Status",
      price: details.status,
    }
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
    details.permanantAddressLine2,
    details.permanantCity,
    details.permanantState,
    details.permanantPincode,

  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <AdminAppDrawer />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper
          component="form"
          sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
          style={{ marginTop: "100px" }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Customer"
            inputProps={{ "aria-label": "search customer" }}
            onChange={handleSearchTextChange}
            value={searchText}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={handleSearchClick}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      {isClicked &&
        <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: 10 }}>
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
                    <Typography variant="h7" gutterBottom sx={{ mt: 2 }} style={{ textAlign: "left" }}>
                      <b>Current Address</b>
                    </Typography>
                    <Typography gutterBottom style={{ textAlign: "left", paddingRight: "4px" }}>{addresses.join(", ")}</Typography>
                  </Grid>
                  <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h7" gutterBottom sx={{ mt: 2 }} style={{ textAlign: "right" }}>
                      <b>Permanent Address</b>
                    </Typography>
                    <Typography gutterBottom style={{ textAlign: "right", paddingLeft: "4px" }}>{paddresses.join(", ")}</Typography>
                  </Grid>
                </Grid>
                <div style={{marginTop:"30px"}}>
                {details.status === "active" ? <Button variant="contained">Deactivate User</Button> : <Button variant="contained">Activate User</Button>}</div>
              </React.Fragment>
            </Box>
          </Paper>
        </Container>}
    </ThemeProvider>
  );
}
