import * as React from "react";
import { useHistory, useParams } from "react-router-dom";
import { ListItem, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const RecipeListItem = React.memo(({ recipe }: { recipe: any }) => {
  const classes = useStyles();
  const params = useParams<any>();
  const history = useHistory();
  const to = `/recipes/${recipe.id}/${recipe.title.replace(/[^a-zA-Z0-9_]/g, "-")}`;
  const goToRecipe = () => {
    history.push(to);
  };

  return (
    <ListItem selected={recipe.id === params.recipeId} classes={classes} onClick={goToRecipe}>
      <ListItemText>{recipe.title}</ListItemText>
    </ListItem>
  );
});

RecipeListItem.displayName = "RecipeListItem";

export default RecipeListItem;
