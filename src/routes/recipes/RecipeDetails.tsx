import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Checkbox, Typography, List, ListItem, ListItemText, ListItemIcon, CircularProgress } from "@material-ui/core";
import toTitleCase from "titlecase";

type RecipeListQueryType = {
  recipeById: any;
};

const query = gql`
  query RecipeDetailsQuery($id: ID!) {
    recipeById(id: $id) {
      id
      title
      instructions
      description
      unformatted
      ingredients {
        name
        measure
        amount
      }
    }
  }
`;

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexGrow: 1,
    height: "100%",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  }
})

const RecipeDetails: React.FunctionComponent<{}> = () => {
  const { recipeId } = useParams();
  const { loading, data } = useQuery<RecipeListQueryType>(query, { variables: { id: recipeId } });
  const classes = useStyles();

  if (loading) {
    return <div className={`${classes.root} ${classes.center}`}><CircularProgress /></div>
  }
  return (
    <React.Fragment>
      <Typography variant="h3" component="h1">
        {data.recipeById.title}
      </Typography>
      <Typography variant="subtitle1">{data.recipeById.description}</Typography>
      <Typography variant="h4" component="h2">
        Ingredients
      </Typography>
      <List dense>
        {data.recipeById.ingredients.map((ingredient: any) => (
          <ListItem key={ingredient.ingredient}>
            <ListItemIcon>
              <React.Fragment>
                <Checkbox />
              </React.Fragment>
            </ListItemIcon>
            <ListItemText>
              {ingredient.amount} {toTitleCase(ingredient.measure)} {toTitleCase(ingredient.name)}
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Typography variant="h4" component="h2">
        Directions
      </Typography>
      <Typography variant="body1">{data.recipeById.instructions}</Typography>
      <Typography variant="h4" component="h2">
        Unformatted
      </Typography>
      <Typography variant="body1">
        <span dangerouslySetInnerHTML={{__html: data.recipeById.unformatted}} />
      </Typography>
    </React.Fragment>
  );
};

export default RecipeDetails;
