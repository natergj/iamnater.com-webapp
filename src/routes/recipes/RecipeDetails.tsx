import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {
  Checkbox,
  Typography,
  List,
  ListItem,
  CircularProgress,
  Button,
  FormControlLabel,
  ListItemText,
} from "@material-ui/core";
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

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexGrow: 1,
    height: "100%",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
}));

const RecipeDetails: React.FunctionComponent<{}> = () => {
  const { recipeId } = useParams();
  const history = useHistory();
  const { loading, error, data } = useQuery<RecipeListQueryType>(query, {
    variables: { id: recipeId },
    errorPolicy: "all",
  });
  const isMobile = useMediaQuery("(max-width:375px)");
  const classes = useStyles();

  if (loading) {
    return (
      <div className={`${classes.root} ${classes.center}`}>
        <CircularProgress />
      </div>
    );
  }

  if (!data) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <React.Fragment>
      {isMobile ? (
        <Button onClick={() => history.push("/recipes")} startIcon={<ChevronLeftIcon />} fullWidth>
          Back to recipes
        </Button>
      ) : null}
      <Typography className={classes.heading} variant="h3" component="h1">
        {data.recipeById.title}
      </Typography>
      <Typography variant="subtitle1">{data.recipeById.description}</Typography>
      <Typography className={classes.heading} variant="h4" component="h2">
        Ingredients
      </Typography>
      <List dense>
        {data.recipeById.ingredients.map((ingredient: any, index) => (
          <ListItem key={index}>
            <ListItemText>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label={`${convertToFraction(ingredient.amount)} ${toTitleCase(ingredient.measure)} ${toTitleCase(
                  ingredient.name,
                )}`}
              />
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Typography className={classes.heading} variant="h4" component="h2">
        Directions
      </Typography>
      <Typography variant="body1">{data.recipeById.instructions}</Typography>
      {data.recipeById.unformatted ? (
        <React.Fragment>
          <Typography className={classes.heading} variant="h4" component="h2">
            Unformatted
          </Typography>
          <Typography variant="body1">
            <span dangerouslySetInnerHTML={{ __html: data.recipeById.unformatted }} />
          </Typography>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

function gcd(a: number, b: number) {
  return b ? gcd(b, a % b) : a;
}

function reduce(numerator, denominator) {
  const den = gcd(numerator, denominator);
  return [numerator / den, denominator / den];
}

function convertToFraction(num: number) {
  let numerator, denominator;
  const wholeNumber = Math.floor(num);
  const remainder = num % 1;
  if (remainder === 0) {
    return wholeNumber;
  }
  const sixteenths = remainder / (1 / 16);
  const sixths = remainder / (1 / 6);

  if (sixths === parseInt(sixths.toString(), 10)) {
    [numerator, denominator] = reduce(sixths, 6);
  } else {
    [numerator, denominator] = reduce(sixteenths, 16);
  }
  return `${wholeNumber || ""} ${numerator}/${denominator}`;
}

export default RecipeDetails;
