import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
    padding: (props: any) => props.isMobile ? 0 : theme.spacing(1),
    overflow: "auto",
  },
}));

const Recipes: React.FunctionComponent<{}> = () => {
  const isMobile = useMediaQuery('(max-width:375px)');
  const classes = useStyles({ isMobile });
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
        ) : isMobile ? null :(
          <RecipesHistory />
        )}
      </div>
    </div>
  );
};

export default Recipes;
