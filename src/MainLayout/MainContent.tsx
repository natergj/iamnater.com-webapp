import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Home from "../routes/Home";
import ErrorBoundary from "../components/ErrorBoundary";
import Auth from "../components/Auth";
const Recipes = React.lazy(() => import(/* webpackChunkName: "recipes" */ "../routes/recipes/Recipes"));

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    paddingLeft: "env(safe-area-inset-left)",
    paddingRight: "env(safe-area-inset-right)",
    paddingBottom: "env(safe-area-inset-bottom)",
  },
});

const MainContent = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <ErrorBoundary>
        <Auth />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path={["/recipes/:recipeId", "/recipes"]}>
            <React.Suspense fallback="loading">
              <Recipes />
            </React.Suspense>
          </Route>
          <Route render={() => "Page not found"} />
        </Switch>
      </ErrorBoundary>
    </main>
  );
};

export default MainContent;
