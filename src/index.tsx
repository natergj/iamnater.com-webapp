import * as React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme";
import MainLayout from "./MainLayout";
import client from "./graphql/client";

const App = () => {
  return (
    <CssBaseline>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <MainLayout />
          </ThemeProvider>
        </ApolloProvider>
      </BrowserRouter>
    </CssBaseline>
  );
};

render(<App />, document.getElementById("app"));
