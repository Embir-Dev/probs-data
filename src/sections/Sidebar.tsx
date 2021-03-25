import { createStyles, makeStyles, Theme } from "@material-ui/core";
import RollButton from "../components/RollButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sidebar: {
      display: "flex",
      flexDirection: "column",
      width: "30vw",
    },
  })
);

const Sidebar = () => {
  const classes = useStyles();
  return (
    <section className={classes.sidebar}>
      <RollButton />
    </section>
  );
};

export default Sidebar;
