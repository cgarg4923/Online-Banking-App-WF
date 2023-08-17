import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Grid, TextField, Button } from "@mui/material";
import AppDrawer from "./Drawer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("12345", "54321", 1324171354, 3287263),
  createData("67890", "09876", 1403500365, 9596961),
];

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#B04040",
    },
  },
});

export default function AccountStatement() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isPressed, setIsPressed] = React.useState(false);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  var customerId;
  useEffect(() => {
    var dat = window.sessionStorage.getItem("userCredentials");
    var data = JSON.parse(dat);
    customerId = data["customerId"];
    const baseURL =
      "http://localhost:9080/customer/fetchCustomerAccounts/" + customerId;
    axios
      .get(baseURL)
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(accounts);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSelectAccount = (e) => {
    setSelectedAccount(e.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div>
        <AppDrawer />
        <div style={{ marginTop: "100px" }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="From Date"
                //value={fromAccount}
                //onChange={(e) => setFromAccount(e.target.value)}
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                style={{ padding: "10px" }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="To Date"
                //value={fromAccount}
                //onChange={(e) => setFromAccount(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                type="date"
                style={{ padding: "10px" }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                value={selectedAccount}
                onChange={handleSelectAccount}
                label="Choose Account"
                select
                helperText="Choose an account for transaction"
                style={{ padding: "10px" }}
              >
                {accounts.map((account, index) => (
                  <MenuItem value={account}>{account}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Button
            //onClick={setIsPressed(true)}
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            style={{ width: "30%" }}
          >
            Go
          </Button>
          <Paper sx={{ width: "100%" }}>
            <TableContainer
              sx={{ maxHeight: "20%" }}
              style={{
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "10px",
              }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={5}>
                      <b>Transaction History</b>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ top: 57, minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </ThemeProvider>
  );
}
