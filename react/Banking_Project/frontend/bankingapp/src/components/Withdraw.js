import React, { useEffect, useState } from "react";
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
import axios from "axios";

const defaultTheme = createTheme({
    palette: {
      primary: {
        main: "#FF0000",
      },
    },
  });

const Withdraw = () => {

    const [amount, setAmount] = useState("");
    const [remark, setRemark] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState("");
    var data;
    useEffect(()=>{
    var dat = window.sessionStorage.getItem("userCredentials");
    data = JSON.parse(dat);
    var customerId = data["customerId"];
    const baseURL='http://localhost:9080/customer/fetchCustomerAccounts/'+customerId;
        axios.get(baseURL).then((response)=>{setAccounts(response.data)}).catch((error)=>{console.error(error)});
        console.log(accounts);

    })
    var dat = window.sessionStorage.getItem("userCredentials");
    var data = JSON.parse(dat);
    var customerId = data["customerId"];
    const baseURL='http://localhost:9080/customer/fetchCustomerAccounts/'+customerId;
    
    function getSqlDate() {
        var pad = function(num){return ('00'+num).slice(-2)};
        var date = new Date();
        return date.getUTCFullYear() + '-' + pad((date.getUTCMonth()+1)) + '-' + pad(date.getUTCDate());
    }

    const handleSelectAccount = (e) => {
        setSelectedAccount(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const transactionTime = getSqlDate();

        const transferInfo = {
            amount,
            selectedAccount,
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
                    <Typography variant="h5" align="center" gutterBottom style={{"fontFamily": "Nanum Myeongjo, serif"}}>
                        <b>Withdraw</b>
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ width: "80%", marginTop: 20 }}>
                        <TextField fullWidth value={selectedAccount} onChange={handleSelectAccount} label="Choose Account" select helperText="Choose an account for transaction" style={{ padding: "10px" }}>
                            {
                                accounts.map((account, index) => (
                                    <MenuItem value={account}>{account}</MenuItem>
                                )
                                )
                            }
                        </TextField>
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

export default Withdraw;
