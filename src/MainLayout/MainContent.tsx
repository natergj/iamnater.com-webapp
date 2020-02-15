import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Home from "../routes/Home";
import ErrorBoundary from "../components/ErrorBoundary";
const Recipes = React.lazy(() => import(/* webpackChunkName: "recipes" */ "../routes/recipes/Recipes"));

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
});

const MainContent = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <ErrorBoundary>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path={["/recipes/:recipeId", "/recipes"]}>
            <React.Suspense fallback="">
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
