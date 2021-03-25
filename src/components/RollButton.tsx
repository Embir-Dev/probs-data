import { Button, makeStyles, createStyles, Theme } from "@material-ui/core";
import useContext from "../appContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      borderRadius: 0,
      borderLeft: 0,
      height: theme.spacing(6),
    },
  })
);

const Results = () => {
  const { roll } = useContext();
  const classes = useStyles();
  return (
    <Button variant="outlined" onClick={roll} className={classes.button}>
      Roll
    </Button>
  );
};

export default Results;
