import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RecipeList from "./RecipeList";
import RecipeDetails from "./RecipeDetails";
import RecipesHistory from "./RecipesHistory";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
  },
  detailsContainer: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}));

const Recipes: React.FunctionComponent<{}> = () => {
  const classes = useStyles();
  const { recipeId } = useParams();

  return (
    <div className={classes.root}>
      <React.Suspense fallback="">
        <RecipeList />
      </React.Suspense>
      <div className={classes.detailsContainer}>
        {recipeId ? (
          <React.Suspense fallback="">
            <RecipeDetails />
          </React.Suspense>
        ) : (
          <RecipesHistory />
        )}
      </div>
    </div>
  );
};

export default Recipes;
