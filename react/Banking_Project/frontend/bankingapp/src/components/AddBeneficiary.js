import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppDrawer from "./Drawer";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#B04040",
    },
  },
});

const AddBeneficiary = () => {
  var customerId;
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [reEnteredAccountNumber, setReEnteredAccountNumber] = useState("");
  const [nickName, setNickName] = useState("");

  useEffect(()=>{
    var data = window.sessionStorage.getItem("userCredentials");
    customerId = JSON.parse(data)["customerId"];
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const baseURL = "http://localhost:9080/benificiary/saveAccountData/"+customerId;

    if (accountNumber !== reEnteredAccountNumber) {
      alert("Account numbers don't match.");
      return;
    }

    const beneficiaryInfo = {
      beneficiaryName,
      accountNumber,
      nickName,
    };
    axios.post(baseURL,{
      accountNo:accountNumber
    }).then((response)=>{alert("success"); console.log(response.data)}).catch((e)=>{console.error(e)});
    console.log("Beneficiary Information:", beneficiaryInfo);
  };

  return (<ThemeProvider theme={defaultTheme}>
    <AppDrawer/>
    <Container maxWidth="sm" style={{ marginTop: "13%" }}>
      <Paper elevation={3} style={{ padding: "30px" }}>
        <Typography variant="h4" align="center" gutterBottom style={{ fontFamily: "Nanum Myeongjo, serif" ,padding:"20px"}}>
         <b>Add New Beneficiary</b>
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Beneficiary Name"
                fullWidth
                value={beneficiaryName}
                onChange={(e) => setBeneficiaryName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Account Number"
                fullWidth
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Re-enter Account Number"
                fullWidth
                value={reEnteredAccountNumber}
                onChange={(e) => setReEnteredAccountNumber(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nick Name"
                fullWidth
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ width: "100px" }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
    </ThemeProvider>
  );
};

export default AddBeneficiary;
