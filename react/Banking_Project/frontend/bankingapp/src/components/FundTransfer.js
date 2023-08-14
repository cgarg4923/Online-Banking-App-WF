import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from "@mui/material";

const FundTransferComponent = () => {
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const transactionTime = new Date().toLocaleString();

    const transferInfo = {
      fromAccount,
      toAccount,
      amount,
      remark,
      transactionTime,
    };

    console.log("Transfer Information:", transferInfo);
  };

  return (
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
            <TextField
              label="Remark"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              fullWidth
              style={{ padding: "10px" }}
            />
            <Box sx={{ mt: 2 }}>
              <Typography>
                Transaction Time: {new Date().toLocaleString()}
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
  );
};

export default FundTransferComponent;
