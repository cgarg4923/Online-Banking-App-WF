import React from 'react'
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const defaultTheme = createTheme({
    palette: {
      primary: {
        main: "#B04040",
      },
    },
  });

export default function NotFound() {
  return (
    <ThemeProvider theme={defaultTheme}>
    <div style={{marginTop:"100px"}}>
    <Typography
              component="h2"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
              style={{
                fontFamily: "Bitter, serif",
              }}
            >
              <b>Oops! You seem to be lost.</b>
            </Typography>
            <Typography
              component="h5"
              variant="h6"
              align="center"
              color="text.primary"
              gutterBottom
              style={{
                fontFamily: "Bitter, serif",
                marginBottom: "20px"
              }}
            >
              Navigate back to home page!
            </Typography>
        <Button variant="contained" href="/">Go Back</Button>
    </div>
    </ThemeProvider>
  )
}
