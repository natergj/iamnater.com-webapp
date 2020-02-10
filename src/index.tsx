import * as React from "react";
import { render } from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import theme from "./theme";
import MainLayout from "./MainLayout";

const App = () => {
  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <MainLayout />
      </ThemeProvider>
    </CssBaseline>
  );
};

render(<App />, document.getElementById("app"));
