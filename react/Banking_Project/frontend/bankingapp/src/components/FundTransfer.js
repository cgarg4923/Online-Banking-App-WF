import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const defaultTheme = createTheme(
  {
    palette: {
      primary: {
        main: "#B04040",
      },
    },
  }
);

const FundTransferComponent = () => {
  const [paymentMode, setPaymentMode] = useState("");
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");

  function getSqlDate() {
    var pad = function(num){return ('00'+num).slice(-2)};
    var date = new Date();
    return date.getUTCFullYear() + '-' + pad((date.getUTCMonth()+1)) + '-' + pad(date.getUTCDate());
  }

  const handlePaymentMode = (e) => {
    setPaymentMode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const transactionTime = getSqlDate();

    const transferInfo = {
      fromAccount,
      toAccount,
      amount,
      paymentMode,
      remark,
      transactionTime,
    };

    console.log("Transfer Information:", transferInfo);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20%" }}>
        <Box
          sx={{
            mt: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Initiate Payment
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: "80%", marginTop: 20 }}>
            <TextField
              label="From Account"
              value={fromAccount}
              onChange={(e) => setFromAccount(e.target.value)}
              fullWidth
              required
              style={{ padding: "10px" }}
            />
            <TextField
              label="To Account"
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
              fullWidth
              required
              style={{ padding: "10px" }}
            />
            <TextField
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              required
              style={{ padding: "10px" }}
            />
            <TextField fullWidth value={paymentMode} onChange={handlePaymentMode} label="Payment Mode" select helperText="Please select payment mode" style={{ padding: "10px" }}>
              <MenuItem value={"NEFT"}>NEFT</MenuItem>
              <MenuItem value={"RTGS"}>RTGS</MenuItem>
              <MenuItem value={"IMPS"}>IMPS</MenuItem>
            </TextField>
            <TextField
              label="Remark"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              fullWidth
              style={{ padding: "10px" }}
            />
            <Box sx={{ mt: 2 }}>
              <Typography>
                Transaction Time: {new Date().toLocaleDateString()}
              </Typography>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              style={{ padding: "10px", width: "90px" }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
    </ThemeProvider>
  );
};

export default FundTransferComponent;
