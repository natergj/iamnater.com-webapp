import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';
import MainAppBar from "./MainAppBar";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  }
}));

const MainLayout: React.FunctionComponent<{}> = () => {
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <MainAppBar />
    </div>
  );
};

export default MainLayout;
