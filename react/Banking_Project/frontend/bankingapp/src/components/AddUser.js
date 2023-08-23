import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminAppDrawer from "./AdminDrawer";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#B04040",
    },
  },
});

export default function AddUser() {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const baseURL = "http://localhost:9080/customer/saveCustomerData";

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
    occupationType: ""
  });

  function handleDetails(e) {
    const { name, value } = e.target;
    console.log(details);
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }

  //get Date of Birth
  function getDateOfBirth(date) {
    var parts = date.split("-");
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  function validateForm() {
    if(details.password.length < 8){
      alert("Password must be atleast 8 characters long");
      return false;
    }
    if (details.password != details.confirmPassword) {
      alert("Password does not match!");
      return false;
    }
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!validateForm()){return;}
    var cid = details.phoneNumber + "";
    cid = "U" + cid.split("").reverse().join("");
    console.log(details);
    axios
      .post(baseURL, {
        customerId: cid,
        firstName: details.firstName,
        middleName: details.middleName,
        lastName: details.lastName,
        emailId: details.email,
        phoneNumber: details.phoneNumber,
        aadharNumber:details.aadhar,
        fatherName: details.fatherName,
        dateOfBirth: getDateOfBirth(details.dateOfBirth),
        password: details.password,
        address: [
          {
            addressLine1: details.currentAddressLine1,
            addressLine2: details.currentAddressLine2,
            state: details.currentState,
            city: details.currentCity,
            pincode: details.currentPincode,
            addressType: "current",
          },
          {
            addressLine1: checked
              ? details.permanantAddressLine1
              : details.currentAddressLine1,
            addressLine2: checked
              ? details.permanantAddressLine2
              : details.currentAddressLine2,
            state: checked
              ? details.permanantState
              : details.currentState,
            city: checked ? details.permanantCity : details.currentCity,
            pincode: checked
              ? details.permanantPincode
              : details.currentPincode,
            addressType: "permenant",
          }
        ],
        grossAnnualIncome: parseFloat(details.grossAnnualIncome),
        sourceOfIncome: details.sourceOfIncome,
        occupationType: details.occupationType,
        status:"active"
      })
      .then((response) => {
        alert("Bank Account Added\n" + "Customer ID: " + cid);
        navigate("/AdminDashboard");
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
        <AdminAppDrawer/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="Travis Howard"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            sx={{ width: 100, height: 100, m: 1 }}
          />
          <Typography component="h1" variant="h5">
            Create Profile
          </Typography>
          <br />
          <div>
            <b>Personal Details</b>
          </div>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleDetails}
                  value={details.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="middleName"
                  fullWidth
                  id="middleName"
                  label="Middle Name"
                  onChange={handleDetails}
                  value={details.middleName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleDetails}
                  value={details.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="dateOfBirth"
                  type="date"
                  label="D.O.B"
                  name="dateOfBirth"
                  InputLabelProps={{ shrink: true }}
                  onChange={handleDetails}
                  value={details.dateOfBirth}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleDetails}
                  value={details.email}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="fatherName"
                  label="Father's Name"
                  id="fatherName"
                  onChange={handleDetails}
                  value={details.fatherName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="aadhar"
                  label="Aadhar Card"
                  id="aadhar"
                  onChange={handleDetails}
                  value={details.aadhar}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Contact Number"
                  id="phoneNumber"
                  onChange={handleDetails}
                  value={details.phoneNumber}
                />
              </Grid>

              <Grid item xs={12}>
                <div>
                  <b>Set New Login Password</b>
                </div>
                <br />
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="New Password"
                  type="password"
                  id="password"
                  onChange={handleDetails}
                  value={details.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm New Password"
                  type="password"
                  id="confirmPassword"
                  onChange={handleDetails}
                  value={details.confirmPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <div>
                  <b>Residential Address</b>
                </div>
                <br />
                <TextField
                  required
                  fullWidth
                  name="currentAddressLine1"
                  label="Address Line 1"
                  id="currentAddressLine1"
                  onChange={handleDetails}
                  value={details.currentAddressLine1}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="currentAddressLine2"
                  label="Address Line 2"
                  id="curentAddressLine2"
                  onChange={handleDetails}
                  value={details.currentAddressLine2}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="currentState"
                  required
                  fullWidth
                  id="currentState"
                  label="State"
                  onChange={handleDetails}
                  value={details.currentState}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="currentCity"
                  required
                  fullWidth
                  id="currentCity"
                  label="City"
                  onChange={handleDetails}
                  value={details.currentCity}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="currentPincode"
                  label="Pincode"
                  id="currentPincode"
                  onChange={handleDetails}
                  value={details.currentPincode}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="sameAddress"
                      color="primary"
                      onChange={(e) => {
                        setChecked(e.target.checked);
                      }}
                    />
                  }
                  label="Check if Permanent Address is Different"
                />
              </Grid>
              {checked && (
                <>
                  <Grid item xs={12}>
                    <div>
                      <b>Permanent Address</b>
                    </div>
                    <br />
                    <TextField
                      required
                      fullWidth
                      name="permanantAddressLine1"
                      label="Address Line 1"
                      id="permanantAddressLine1"
                      onChange={handleDetails}
                      value={details.permanantAddressLine1}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="permanantAddressLine2"
                      label="Address Line 2"
                      id="permanantAddressLine2"
                      onChange={handleDetails}
                      value={details.permanantAddressLine2}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="permanantState"
                      required
                      fullWidth
                      id="permamantState"
                      label="State"
                      onChange={handleDetails}
                      value={details.permanantState}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="permanantCity"
                      required
                      fullWidth
                      id="permanantCity"
                      label="City"
                      onChange={handleDetails}
                      value={details.permanantCity}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="permanantPincode"
                      label="Pincode"
                      id="permanantPincode"
                      onChange={handleDetails}
                      value={details.permanantPincode}
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <div>
                  <b>Occupation Details</b>
                </div>
                <br />
                <TextField
                  required
                  fullWidth
                  name="occupationType"
                  label="Occupation Type"
                  id="occupationType"
                  onChange={handleDetails}
                  value={details.occupationType}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="sourceOfIncome"
                  label="Source Of Income"
                  id="sourceOfIncome"
                  onChange={handleDetails}
                  value={details.sourceOfIncome}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="grossAnnualIncome"
                  label="Gross Annual Income"
                  id="grossAnnualIncome"
                  onChange={handleDetails}
                  value={details.grossAnnualIncome}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Open Account
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
