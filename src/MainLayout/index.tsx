import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MainAppBar from "./MainAppBar";
import MainContent from "./MainContent";

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    height: "100%",
  },
}));

const MainLayout: React.FunctionComponent<{}> = () => {
  const classes = useStyles({});

  return (
    <div className={classes.root} id="layout-root">
      <MainAppBar />
      <MainContent />
    </div>
  );
};

export default MainLayout;
