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
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#B04040",
    },
  },
});

export default function CreateNewUser() {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const [mob, setMob] = useState("");
  const baseURL = "http://localhost:9080/customer/saveCustomerData";
  const onMobChange = (event) => {
    setMob(event.target.value);
  };

  //get Date of Birth
  function getDateOfBirth(date) {
    var parts = date.split("-");
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var cid = mob + "";
    cid = "U" + cid.split("").reverse().join("");

    axios
      .post(baseURL, {
        customerId: cid,
        firstName: data.get("firstName"),
        middleName: data.get("middleName"),
        lastName: data.get("lastName"),
        emailId: data.get("email"),
        phoneNumber: data.get("phoneNumber"),
        aadharNumber: data.get("aadhar"),
        fatherName: data.get("fatherName"),
        dateOfBirth: getDateOfBirth(data.get("dateOfBirth")),
        password: data.get("password"),
        address: [
          {
            addressLine1: data.get("currentAddressLine1"),
            addressLine2: data.get("currentAddressLine2"),
            state: data.get("currentState"),
            city: data.get("currentCity"),
            pincode: data.get("currentPincode"),
            addressType: "current",
          },
          {
            addressLine1: checked
              ? data.get("permanantAddressLine1")
              : data.get("currentAddressLine1"),
            addressLine2: checked
              ? data.get("permanantAddressLine2")
              : data.get("currentAddressLine2"),
            state: checked
              ? data.get("permanantState")
              : data.get("currentState"),
            city: checked ? data.get("permanantCity") : data.get("currentCity"),
            pincode: checked
              ? data.get("permanantPincode")
              : data.get("currentPincode"),
            addressType: "permenant",
          },
        ],
        grossAnnualIncome: data.get("grossAnnualIncome"),
        sourceOfIncome: data.get("sourceOfIncome"),
        occupationType: data.get("occupationType"),
      })
      .then((response) => {
        alert("Bank Account Added\n" + "Customer ID: " + cid);
        var item = {
          customerId: cid,
          phoneNumber: data.get("phoneNumber"),
        };
        window.sessionStorage.setItem("userCredentials", JSON.stringify(item));
        navigate("/OpenNewAccount");
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="Travis Howard"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            sx={{ width: 100, height: 100, m:1 }}
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
            noValidate
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="middleName"
                  fullWidth
                  id="middleName"
                  label="Middle Name"
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="fatherName"
                  label="Father's Name"
                  id="fatherName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="aadhar"
                  label="Aadhar Card"
                  id="aadhar"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Contact Number"
                  id="phoneNumber"
                  onChange={onMobChange}
                  value={mob}
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="currentAddressLine2"
                  label="Address Line 2"
                  id="curentAddressLine2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="currentState"
                  required
                  fullWidth
                  id="currentState"
                  label="State"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="currentCity"
                  required
                  fullWidth
                  id="currentCity"
                  label="City"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="currentPincode"
                  label="Pincode"
                  id="currentPincode"
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="permanantAddressLine2"
                      label="Address Line 2"
                      id="permanantAddressLine2"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="permanantState"
                      required
                      fullWidth
                      id="permamantstate"
                      label="State"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="permanantCity"
                      required
                      fullWidth
                      id="permanantCity"
                      label="City"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="permanantPincode"
                      label="Pincode"
                      id="permanantPincode"
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="sourceOfIncome"
                  label="Source Of Income"
                  id="sourceOfIncome"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="grossAnnualIncome"
                  label="Gross Annual Income"
                  id="grossAnnualIncome"
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
