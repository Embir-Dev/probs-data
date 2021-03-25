import { createStyles, makeStyles, Theme } from "@material-ui/core";
import RollCount from "../components/RollCount";
import EquationField from "../components/EquationField";
import useContext from "../appContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
    },
    hiddenSubmit: {
      display: "none",
    },
  })
);

const Header = () => {
  const classes = useStyles();
  const { roll } = useContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    roll();
  };

  return (
    <form onSubmit={handleSubmit} className={classes.header}>
      <RollCount />
      <EquationField />
      <input type="submit" className={classes.hiddenSubmit} />
    </form>
  );
};

export default Header;
