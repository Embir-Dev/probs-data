import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Header from "./Header";
import Results from "../../../components/Results";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      flex: 1,
    },
  })
);

const Main = () => {
  const classes = useStyles();
  return (
    <main className={classes.main}>
      <Header />
      <Results />
    </main>
  );
};

export default Main;
