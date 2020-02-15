import * as React from "react";
import { gql, useQuery } from "@apollo/client"
import { makeStyles } from "@material-ui/core/styles";
import RecipeListItem from "./RecipeListItem";
import { List, TextField, CircularProgress } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles(theme => ({
  root: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: "240px",
    minWidth: "240px",
    // height: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    display: "block"
  },
  list: {
    height: "100%",
    overflow: "auto",
  },
  cancel: {
    cursor: "pointer",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  }
}));

type RecipeListQueryType = {
  recipes: any[],
};

const query = gql`
  query RecipeListQuery {
    recipes {
      id
      title
    }
  }
`;


const RecipeList: React.FunctionComponent<{}> = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const { loading, data } = useQuery<RecipeListQueryType>(query);
  const classes = useStyles();
  const re = new RegExp(searchValue, "ig");

  if (loading) {
    return <div className={`${classes.root} ${classes.center}`}><CircularProgress /></div>
  }
  return (
    <div className={classes.root}>
      <TextField
        variant="filled"
        fullWidth
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        label="Search"
        InputProps={{
          endAdornment: <CancelIcon className={classes.cancel} onClick={_ => setSearchValue("")} />,
        }}
        className={classes.textField}
      />
      <List className={classes.list}>
        {data.recipes.map((recipe: any) =>
          recipe.title.match(re) ? <RecipeListItem key={recipe.id} recipe={recipe} /> : null,
        )}
      </List>
    </div>
  );
};

export default RecipeList;
