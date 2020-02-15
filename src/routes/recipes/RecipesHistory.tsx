import * as React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import photo from "../../assets/IMG_0566.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  body1: {
    marginBottom: theme.spacing(1),
  },
  photo: {
    float: "left",
    marginRight: theme.spacing(2),
  }
}));

const RecipesHistory: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2" component="h1">
        A brief history
      </Typography>
      <img src={photo} className={classes.photo} />
      <Typography variant="body1" className={classes.body1}>
        Grandma Jorde grew up on a small farm in North Dakota to German parents. When Grandma married my Grandfather, a
        full blooded Norweigan, she learned how to prepare all of his favorite things. Dinners at Grandma's house
        therefore became a wonderful mix of German and Norweigan cooking and baking.
      </Typography>
      <Typography variant="body1" className={classes.body1}>
        Nearly all that I know of cooking and baking came from my Grandma Jorde. Her kitchen was never without some sort
        of goodie for anyone who came to visit. As my nephew put it about her Krumkakka, "it just make you feel happier
        about things"
      </Typography>
      <Typography variant="body1" className={classes.body1}>
        This is my Grandma and me at Thanksgiving 2005. I baked the turkey that year; she was quite proud.
      </Typography>
      <Typography variant="body1" className={classes.body1}>
        Click on any of the titles to the left to show the recipe. I'm working on a print function to make them easily
        printable and hope to have that completed soon.
      </Typography>
    </div>
  );
};

export default RecipesHistory;
