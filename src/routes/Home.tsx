import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import img1 from "../assets/CoCollegeParkCenter8527imagesconstruct.gif";
import img2 from "../assets/Aurora2854imagesunderconstruction.gif";
import img3 from "../assets/CoColosseumField3807construction2.gif";
import resume from "../assets/Resume-Nater_Jorde.pdf";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: "#b7d0f7",
    height: "100%",
    fontSize: theme.typography.body1.fontSize,
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <img src={img1} />
        <img src={img2} />
        <img src={img3} />
      </div>

      <header>Bio</header>
      <div>
        <p>
          <li>A child of the 80s</li>
          <li>Born on a North Dakota Farm. Well, raised on a farm anyways, I was born in a hospital.</li>
          <li>Learned to cook, bake, and fry pretty much anything Norweigan or German from my Grandmother</li>
          <li>Got a B.A. from the University of Minnesota</li>
          <li>Worked 7.5 years for Apple Retail in Minnesota, California, Colorado, and Massachusetts</li>
          <li>Met lots of people, had lots of fun</li>
          <li>Worked 4.5 years for Harvard University</li>
          <li>Learned lots, grew personally</li>
          <li>Decided to go home to the Midwest</li>
          <li>Work at Code42 as a Front End developer for two years</li>
          <li>Am now working for a small high-end software consultancy shop</li>
        </p>
      </div>
      <header>Work</header>
      <div>
        <p>
          <a href={resume}>Resume</a>
        </p>
        <p>
          I do back-end data &amp; api development and systems architecture bringing disparate information together in
          easy to understand ways. I like doing new and interesting things with technology I've never used before.
        </p>
        <p>Lately, I have been doing a lot of front end development using the ReactJS ecosystem.</p>
        <p>
          My grandparents had a large impact on my life and work ethic. To continue their legacy, I'm putting a lot of
          their work online.
        </p>
        <p>
          <a href="#/recipes">Grandma Jorde's Recipe Box</a>
        </p>
        <p>
          My Grandpa Jorde spent countless hours putting together a family genealogy spanning many aspects of both his
          and my Grandmother's side of the families. He did all of this on his Apple II until the day that his printer
          finally gave out on him. At that point, it was really too late to be able to transfer any of his work from the
          5 1/4 inch Apple II floppy disks to anything current.
        </p>
        <p>
          My Aunt Susan took up the daunting task of re-typing the entire works and publishing it from Google Docs and
          quite a few updates.
        </p>
        <p>
          <strong>Grandpa Jorde's Genealogy</strong>
          <br />
          <a href="https://docs.google.com/document/d/1MvqD9sqijmn1KY7vC5XeSUoBtRI0b2twFMo6qocWxPc/view">
            Jorde Family
          </a>
          <br />
          <a href="https://docs.google.com/document/d/1yEzQfBPNMX1vd7UxVME42J2oRiDA2_cZa7I5IUIzOv4/view">
            Hager Family
          </a>
        </p>
      </div>
      <header>Open Source Projects</header>
      <p>I believe strongly in open source. If I make something reusable, people should be able to reuse it.</p>
      <p>
        <li>
          <a href="https://github.com/natergj/excel4node">excel4node</a>
        </li>
        <li>
          <a href="https://github.com/natergj/sloth-log">sloth-logger</a>
        </li>
        <li>
          <a href="https://github.com/natergj/dynamic-react-module">Web App Module system</a>
        </li>
      </p>
    </div>
  );
};

export default Home;
