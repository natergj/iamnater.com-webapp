import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import RecipeListItem from "./RecipeListItem";
import { List, TextField, CircularProgress } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  root: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: ({ isMobile, hide }: any) => isMobile && !hide ? "100vw" : "240px",
    minWidth: "240px",
    overflow: "hidden",
    display: ({ hide }: any) => hide ? "none" : "flex",
    flexDirection: "column",
  },
  textField: {
    display: "block",
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
  },
}));

type RecipeListQueryType = {
  recipes: any[];
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
  const isMobile = useMediaQuery('(max-width:375px)');
  const { recipeId } = useParams();
  const classes = useStyles({isMobile, hide: isMobile && !!recipeId });
  const re = new RegExp(searchValue, "ig");

  if (loading) {
    return (
      <div className={`${classes.root} ${classes.center}`}>
        <CircularProgress />
      </div>
    );
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
