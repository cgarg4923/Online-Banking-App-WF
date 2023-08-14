import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const products = [
  {
    name: "Reference ID",
    price: "#123456",
  },
  {
    name: "Mode",
    price: "RTGS",
  },
  {
    name: "Paid to Account",
    price: "81305021501234",
  },
  {
    name: "Amount",
    price: "₹100000",
  },
  {
    name: "From Account",
    price: "81307676531234",
  },
  {
    name: "On",
    price: new Date().toLocaleDateString("en-GB"),
  },
  {
    name: "Remarks",
    price: "Test Transfer",
  },
];

export default function TransferSuccessful() {
  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{ mb: 4 }}
      style={{ marginTop: "8%" }}
    >
      <Paper
        variant="outlined"
        sx={{
          my: { xs: 3, md: 6 },
          p: { xs: 2, md: 3 },
          boxShadow: "5px 10px 8px #808080",
        }}
      >
        <Typography component="h1" variant="h4" align="center">
          Transfer Successful!
        </Typography>

        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Order summary
          </Typography>
          <List disablePadding>
            {products.map((product) => (
              <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                <ListItemText primary={product.name} />
                <Typography variant="body2">{product.price}</Typography>
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            //onClick={handleNext}
            sx={{ mt: 3, ml: 1 }}
          >
            Ok
          </Button>
        </React.Fragment>
      </Paper>
    </Container>
  );
}
