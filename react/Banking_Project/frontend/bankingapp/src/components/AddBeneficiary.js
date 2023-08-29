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
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#B04040",
    },
  },
});

const AddBeneficiary = () => {
  const [customerId,setCustomerId] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [reEnteredAccountNumber, setReEnteredAccountNumber] = useState("");
  const [nickName, setNickName] = useState("");
  const navigate = useNavigate();
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage,setErrorMessage]=useState("Error");
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage]=useState("Success");
  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorOpen(false);
  };
  const handleSuccessClose = (event, reason) => {
    setSuccessOpen(false);
    navigate("/fundTransfer")
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    var data = JSON.parse(window.sessionStorage.getItem("userCredentials"));
    setCustomerId(data["customerId"]);

    const baseURL = "http://localhost:9080/benificiary/saveAccountData/"+data["customerId"];

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
    }).then((response)=>{
      if (response.data==="Benificiary added Successfully!") {
        setSuccessOpen(true);
        setSuccessMessage(response.data)
      } else {
        setErrorOpen(true);
        setErrorMessage(response.data)
      }
    }).catch((e)=>{console.error(e)});
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
        <Snackbar anchorOrigin={{vertical:"top",horizontal:"right"}} open={errorOpen} autoHideDuration={6000} onClose={handleErrorClose}>
              <Alert
                onClose={handleErrorClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {errorMessage}
              </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{vertical:"top",horizontal:"right"}} open={successOpen} onClose={handleSuccessClose}>
              <Alert
                onClose={handleSuccessClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                {successMessage+". Close to Redirect."}
              </Alert>
            </Snackbar>
      </Paper>
    </Container>
    </ThemeProvider>
  );
};

export default AddBeneficiary;
