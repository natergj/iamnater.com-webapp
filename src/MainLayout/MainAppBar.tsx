import * as React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { AppBar, Toolbar, CircularProgress } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import NavMenu from "./NavMenu";
import LoginButton from "./LoginButton";
import UserOptionsMenu from "./UserOptionsMenu";
import { UserContext } from "../contexts/User";

const useStyles = makeStyles(theme => ({
  spacer: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: (props: any) => props.bgColor,
    paddingLeft: "env(safe-area-inset-left)",
    paddingRight: "env(safe-area-inset-right)",
  },
  section: {
    color: (props: any) => theme.palette.getContrastText(props.bgColor),
  },
}));

const ROUTE_MAP = new Map([
  ["", "I AM NATER"],
  ["recipes", "RECIPES"],
]);

const MainAppBar: React.FunctionComponent<{}> = () => {
  const location = useLocation();
  const theme = useTheme();
  const { currentUser, isAuthenticating } = React.useContext(UserContext);
  const section = ROUTE_MAP.get(location.pathname.split("/")[1]);
  const bgColor = section === ROUTE_MAP.get("") ? "#5977a3" : theme.palette.background.paper;
  const classes = useStyles({ bgColor });

  return (
    <AppBar position="relative" className={classes.appBar}>
      <Toolbar>
        <ErrorBoundary>
          <NavMenu color={theme.palette.getContrastText(bgColor)} />
          <div className={classes.section}>{section}</div>
          <div className={classes.spacer} />
          {currentUser ? (
            <React.Suspense fallback="">
              <UserOptionsMenu />
            </React.Suspense>
          ) : (
            isAuthenticating ? <CircularProgress /> : <LoginButton />
          )}
        </ErrorBoundary>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
