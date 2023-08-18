import { useState,useEffect } from "react";
import Button from '@mui/material/Button'
import { Container, Grid, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import AppDrawer from "./Drawer";

const defaultTheme = createTheme({
    palette: {
      primary: {
        main: "#B04040",
      },
    },
  });

export default function NetBankingRegistration() {
    
    const [isFormInvalid, setIsFormInvalid] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState("");
    const [transactionPassword, setTransactionPassword] = useState("");
    const [confirmTransactionPassword, setConfirmTransactionPassword] = useState("");
    function validateForm() {
        if (transactionPassword != confirmTransactionPassword) {
            setIsFormInvalid(true);
            return false;
        }
        else {
            return true;
        };
    };
    const handleTransactionPassword = (e) => {
        setTransactionPassword(e.target.value);
    };
    const handleConfirmTransactionPassword = (e) => {
        setConfirmTransactionPassword(e.target.value);
    };
    const handleSelectAccount=(e)=>{
        setSelectedAccount(e.target.value);
    };
    const handlerSubmit = (e) => {
        var baseURL = "";
        if (!validateForm()) {

        }
        else {
            alert("Successful")
            axios.put(
                baseURL,
                {
                    accountNumber: selectedAccount,
                    transactionPassword: transactionPassword
                }
            )
                .then((e) => {
                    alert("Successfuly registered for Internet Banking.");
                }).catch((e) => console.error(e))
        };
        e.preventDefault();
    };

    var customerId;
    useEffect(() => {
        var dat = window.sessionStorage.getItem("userCredentials");
        var data = JSON.parse(dat);
        customerId = data["customerId"];
        const baseURL1 =
            "http://localhost:9080/customer/fetchCustomerAccounts/" + customerId;
        axios
            .get(baseURL1)
            .then((response) => {
                setAccounts(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main">
                <AppDrawer/>
                <CssBaseline />
                <Box sx={{
                    marginTop: 12,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                    <img style={{width:"150px"}} src={"https://th.bing.com/th/id/OIP.4Ty8zc9haqp6mfe1jWlV1wHaGn?pid=ImgDet&rs=1"}></img>
                    <Box component="form" sx={{ mt: 3, width: 500 }} onSubmit={handlerSubmit}>
                        <Typography component="h1" variant="h5" style={{ fontFamily: "Nanum Myeongjo, serif" ,marginBottom:"15px"}}>
                            <b>Register for Internet Banking</b>
                        </Typography>
                        <Grid>
                            <Grid item sm={12}>
                                <TextField
                                    fullWidth
                                    value={selectedAccount}
                                    onChange={handleSelectAccount}
                                    label=" Choose Account"
                                    select
                                    helperText="Choose an account for transaction"
                                    style={{paddingLeft: "10px" ,paddingRight:"10px"}}
                                >
                                    {accounts.map((account, index) => (
                                        <MenuItem value={account}>{account}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid>
                            <Grid item sm={12}>
                                <TextField fullWidth required label="Set Transaction Password" type="password" placeholder="Enter your Transaction Password" onChange={handleTransactionPassword} value={transactionPassword} margin="normal"
                                style={{paddingLeft: "10px" ,paddingRight:"10px"}}>
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid>
                            <Grid item sm={12}>
                                <TextField fullWidth required label="Confirm Transaction Password" type="password" placeholder="Confirm Transaction Password" onChange={handleConfirmTransactionPassword} value={confirmTransactionPassword} margin="normal"
                                    helperText={transactionPassword != confirmTransactionPassword ? isFormInvalid && 'Password Does Not Match' : ''}
                                    error={transactionPassword != confirmTransactionPassword} style={{ paddingLeft: "10px" ,paddingRight:"10px"}}>
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid>
                            <Grid item sm={12}>
                                <Button variant="contained" type="submit" sx={{ mt: 2 }} fullWidth style={{width:"150px"}}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center" sx={{ mt: 2 }}>
                            <Grid item>
                                <Link href="/OpenNewAccount" variant="body2">
                                    First Time User? Create New Account
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}