import * as React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";
import ErrorBoundary from "../components/ErrorBoundary";
import NavMenu from "./NavMenu";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  spacer: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: (props: any) => props.bgColor,
  },
  section: {
    color: (props: any) => theme.palette.getContrastText(props.bgColor),
  },
}));

const ROUTE_MAP = new Map([
  ["", "HOME"],
  ["recipes", "RECIPES"],
]);

const MainAppBar: React.FunctionComponent<{}> = () => {
  const location = useLocation();
  const theme = useTheme();
  const section = ROUTE_MAP.get(location.pathname.split("/")[1]);
  const bgColor = section === ROUTE_MAP.get("") ? "#5977a3" : theme.palette.background.paper;
  const classes = useStyles({ bgColor });

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <ErrorBoundary>
          <NavMenu color={theme.palette.getContrastText(bgColor)} />
          <div className={classes.section}>{section}</div>
          <div className={classes.spacer} />
        </ErrorBoundary>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
