import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// Create Material UI theme
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#000"
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#000",
      main: "#ffff00",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#000"
    }
    // error: will use the default color
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </MuiThemeProvider>,
  document.getElementById("root")
);
