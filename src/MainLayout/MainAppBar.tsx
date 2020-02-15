import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";
import ErrorBoundary from "../components/ErrorBoundary";
import NavMenu from "./NavMenu";
import { useLocation } from "react-router-dom";

const Loading = () => <div>Loading</div>;

const useStyles = makeStyles(theme => ({
  spacer: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const ROUTE_MAP = new Map([
  ["", "HOME"],
  ["recipes", "RECIPES"],
]);

const MainAppBar: React.FunctionComponent<{}> = () => {
  const classes = useStyles({});
  const location = useLocation();
  const section = ROUTE_MAP.get(location.pathname.split("/")[1])

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <ErrorBoundary>
          <NavMenu />
          <div>{section}</div>
          <div className={classes.spacer} />
        </ErrorBoundary>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
