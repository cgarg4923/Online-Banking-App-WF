import {useState} from "react";
import Button from '@mui/material/Button'
import { Container, FormControl, Grid, InputLabel, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "@mui/material/Link";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Dropdown from 'react-dropdown';
import { Diversity2Sharp } from "@mui/icons-material";
const defaultTheme = createTheme();

export default function OpenNewAccount(){
    const [accountType,setAccountType]=useState("Savings");
    const accountNumber="1001001";
    const customerID="2148165";
    const baseURL="http://localhost:3000/posts";
    const [isFormInvalid, setIsFormInvalid] = useState(false);
    const[accountBalance, setAccountBalance]=useState("");

    function validateForm()
    {
        return true;
    };
    const handleAccountBalance=(e)=>{
        setAccountBalance(e.target.value) ;
    };
    const handleAccountType=(e)=>{
        setAccountType(e.target.value) ;
    };
    const handlerSubmit=(e)=>{
        if(!validateForm()){

        }
        else{
            alert("Successful")
            axios.post(
                baseURL,
                {
                    accountNumber: accountNumber,
                    accountType: accountType,
                    accountBalance: accountBalance
                }
            )
            .then(
                alert("Account Successfuly Created")
            )
        };
        e.preventDefault();
    };
    return(
        <ThemeProvider theme={defaultTheme}>
            <Container component="main">
                <CssBaseline />
                <Box sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                }}>
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Box component="form" sx={{ mt: 3, width:500}} onSubmit={handlerSubmit}>
                        <Typography component="h1" variant="h5">
                            Register for Internet Banking
                        </Typography>
                        <Grid>
                            <Grid item sm={12}>
                                <TextField fullWidth label="User ID" disabled type="text" value={customerID} margin="normal">
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid>
                            <Grid item sm={12}>
                                <TextField fullWidth label="Account Number" disabled type="text" value={accountNumber} margin="normal">
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid>
                        <Grid item sm={12}>
                                <TextField fullWidth value={accountType} onChange={handleAccountType} label="Account Type" margin="normal" select helperText="Please select your account type">
                                    <MenuItem value={"Savings"}>Savings</MenuItem>
                                    <MenuItem value={"Current"}>Current</MenuItem>
                                    <MenuItem value={"Salary"}>Salary</MenuItem>
                                </TextField>
                                </Grid>
                                </Grid>
                        <Grid>
                            <Grid item sm={12}>
                                <TextField fullWidth label="Minimum Account Balance" type="text" onChange={handleAccountBalance} placeholder="Enter the minimum balance" value={accountBalance} margin="normal">
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid>
                            <Grid item sm={12}>
                            <Button variant="contained" type="submit" sx={{mt:2}} fullWidth>
                                Submit
                            </Button>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center" sx={{mt:2}}>
                            <Grid item>
                                <Link href="#" variant="body2">
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