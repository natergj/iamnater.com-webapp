import * as React from "react";
import { Link } from "react-router-dom";
import { Typography, List, ListItem, ListItemIcon, Link as MaterialLink } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";
import CodeIcon from "@material-ui/icons/Code";
import img1 from "../assets/CoCollegeParkCenter8527imagesconstruct.gif";
import img2 from "../assets/Aurora2854imagesunderconstruction.gif";
import img3 from "../assets/CoColosseumField3807construction2.gif";
import resume from "../assets/Resume-Nater_Jorde.pdf";

const bgColor = "#b7d0f7";
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: bgColor,
    height: "100%",
    fontSize: theme.typography.body1.fontSize,
    overflow: "auto",
  },
  heading: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  paragraph: {
    marginBottom: theme.spacing(1),
  },
  bioListItem: {
    listStyleType: "",
  },
}));

const Home = () => {
  const theme = useTheme();

  React.useEffect(() => {
    document.querySelector("body").style.backgroundColor = bgColor;
    document.getElementById("layout-root").style.backgroundColor = bgColor;

    return () => {
      document.querySelector("body").style.backgroundColor = theme.palette.background.paper;
      document.getElementById("layout-root").style.backgroundColor = theme.palette.background.paper;
    };
  }, [theme]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <img src={img1} />
        <img src={img2} />
        <img src={img3} />
      </div>

      <Typography variant="h3" component="h1" className={classes.heading}>
        Bio
      </Typography>
      <div>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            A child of the 80s
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            Born on a North Dakota Farm. Well, raised on a farm anyways, I was born in a hospital.
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            Learned to cook, bake, and fry pretty much anything Norwegian or German from my Grandmother
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            Got a B.A. from the University of Minnesota
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            Worked 7.5 years for Apple Retail in Minnesota, California, Colorado, and Massachusetts
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            Met lots of people, had lots of fun
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            Worked 4.5 years for Harvard University
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            Learned lots, grew personally
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            Decided to go home to the Midwest
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            Worked at Code42 as a Front End developer for two years
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            Did some contract work with a small high-end software consultancy shop
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            Now I write GraphQL apis
          </ListItem>
        </List>
      </div>
      <Typography variant="h3" component="h1" className={classes.heading}>
        Work
      </Typography>
      <div>
        <Typography variant="body1" className={classes.paragraph}>
          <MaterialLink href={resume}>Resume</MaterialLink>
        </Typography>
        <Typography variant="body1" className={classes.paragraph}>
          I do back-end data &amp; api development and systems architecture bringing disparate information together in
          easy to understand ways. I like doing new and interesting things with technology I've never used before.
        </Typography>
        <Typography variant="body1" className={classes.paragraph}>
          Lately, I have been doing a lot of front end development using the ReactJS ecosystem.
        </Typography>
        <Typography variant="body1" className={classes.paragraph}>
          My grandparents had a large impact on my life and work ethic. To continue their legacy, I'm putting a lot of
          their work online.
        </Typography>
        <Typography variant="body1" className={classes.paragraph}>
          <Link to="/recipes">Grandma Jorde's Recipe Box</Link>
        </Typography>
        <Typography variant="body1" className={classes.paragraph}>
          My Grandpa Jorde spent countless hours putting together a family genealogy spanning many aspects of both his
          and my Grandmother's side of the families. He did all of this on his Apple II until the day that his printer
          finally gave out on him. At that point, it was really too late to be able to transfer any of his work from the
          5 1/4 inch Apple II floppy disks to anything current.
        </Typography>
        <Typography variant="body1" className={classes.paragraph}>
          My Aunt Susan took up the daunting task of re-typing the entire works and publishing it from Google Docs and
          quite a few updates.
        </Typography>
        <Typography variant="body1" className={classes.paragraph}>
          <strong>Grandpa Jorde's Genealogy</strong>
          <br />
          <MaterialLink href="https://docs.google.com/document/d/1MvqD9sqijmn1KY7vC5XeSUoBtRI0b2twFMo6qocWxPc/view">
            Jorde Family
          </MaterialLink>
          <br />
          <MaterialLink href="https://docs.google.com/document/d/1yEzQfBPNMX1vd7UxVME42J2oRiDA2_cZa7I5IUIzOv4/view">
            Hager Family
          </MaterialLink>
        </Typography>
      </div>
      <Typography variant="h3" component="h1" className={classes.heading}>
        Open Source Projects
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        I believe strongly in open source. If I make something reusable, people should be able to reuse it.
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <CodeIcon />
          </ListItemIcon>
          <MaterialLink href="https://github.com/natergj/excel4node">excel4node</MaterialLink>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CodeIcon />
          </ListItemIcon>
          <MaterialLink href="https://github.com/natergj/sloth-log">sloth-logger</MaterialLink>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CodeIcon />
          </ListItemIcon>
          <MaterialLink href="https://github.com/natergj/dynamic-react-module">Web App Module system</MaterialLink>
        </ListItem>
      </List>
    </div>
  );
};

export default Home;
