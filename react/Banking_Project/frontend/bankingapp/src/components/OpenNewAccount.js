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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { toUnitless } from "@mui/material/styles/cssUtils";

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function OpenNewAccount() {
  const [checked, setChecked] = useState(false);
  const [mob,setMob] = useState('');
  const baseURL = "http://localhost:9080/saveCustomerData";
 const onMobChange = (event) => {
  setMob(event.target.value)
 }
 //getSQL equivalentDatTime
 function getSQLEquivalentTime(){
  let date = new Date();
  date.toISOString().slice(0,19).replace('T','');
  console.log(date);
  return date;
 }

 //get Date of Birth
 function getDateOfBirth(date){
  var parts = date.split('-');
  return new Date(parts[0],parts[1]-1,parts[2]);
 }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var cid = mob+'';
    var accno = cid+Math.floor(1000+Math.random()*9000).toString();
    // console.log(accno);
    cid = "U"+cid.split("").reverse().join("");

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
        lastLogged: getSQLEquivalentTime(),
        dateOfBirth: getDateOfBirth(data.get("dateOfBirth")),
        password:data.get("password")
      })
      .then((response) => {
        // alert("Bank Account Added\n");
        alert("Bank Account Added\n"+"Customer ID: "+cid+"\nAccount No.: "+accno);
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Open A New Account
          </Typography>
          <br/><div><b>Personal Details</b></div>
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
                  autoFocus
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
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="dateOfBirth"
                  label="D.O.B (YYYY-MM-DD)"
                  name="dateOfBirth"
                  
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
              
              <Grid item xs={12}><div><b>Set New Login Password</b></div><br/>
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
                <div><b>Residential Address</b></div>
                <br />
                <TextField
                  required
                  fullWidth
                  name="addressLine1"
                  label="Address Line 1"
                  id="addressLine1"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="addressLine2"
                  label="Address Line 2"
                  id="addressLine2"
                />  
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="state"
                  required
                  fullWidth
                  id="state"
                  label="State"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="city"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="pincode"
                  label="Pincode"
                  id="pincode"
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
                  <Grid item xs={12}><div><b>Permanent Address</b></div><br/>
                    <TextField
                      required
                      fullWidth
                      name="addressLine1"
                      label="Address Line 1"
                      id="addressLine1"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="addressLine2"
                      label="Address Line 2"
                      id="addressLine2"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="state"
                      required
                      fullWidth
                      id="state"
                      label="State"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="city"
                      required
                      fullWidth
                      id="city"
                      label="City"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="pincode"
                      label="Pincode"
                      id="pincode"
                    />
                  </Grid>
                </>
              )}
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
              
              <Grid item xs={12}><div><b>Occupation Details</b></div><br/>
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
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
