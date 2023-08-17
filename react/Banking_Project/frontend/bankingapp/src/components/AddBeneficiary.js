import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const AddBeneficiaryMaterialUI = () => {
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [reEnteredAccountNumber, setReEnteredAccountNumber] = useState("");
  const [nickName, setNickName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (accountNumber !== reEnteredAccountNumber) {
      alert("Account numbers don't match.");
      return;
    }

    const beneficiaryInfo = {
      beneficiaryName,
      accountNumber,
      nickName,
    };

    console.log("Beneficiary Information:", beneficiaryInfo);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "10%" }}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add New Beneficiary
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
  );
};

export default AddBeneficiaryMaterialUI;
