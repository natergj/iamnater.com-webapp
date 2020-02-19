import * as React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme";
import MainLayout from "./MainLayout";
import client from "./graphql/client";
import { UserProvider } from "./contexts/User";

const App = () => {
  return (
    <CssBaseline>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <UserProvider>
            <ThemeProvider theme={theme}>
              <MainLayout />
            </ThemeProvider>
          </UserProvider>
        </ApolloProvider>
      </BrowserRouter>
    </CssBaseline>
  );
};

render(<App />, document.getElementById("app"));
