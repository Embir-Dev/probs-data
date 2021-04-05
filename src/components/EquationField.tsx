import { TextField, makeStyles, createStyles, Theme } from "@material-ui/core";
import { ChangeEvent } from "react";
import useContext from "../appContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      borderRadius: 0,
      "& input": {
        padding: theme.spacing(2),
        height: "1rem",
      },
    },
  })
);

const EquationField = () => {
  const classes = useStyles();
  const { equation, equationError, handleSetEquation } = useContext();

  const handleCount = (event: ChangeEvent<HTMLInputElement>) => {
    handleSetEquation(event.target.value);
  };

  return (
    <TextField
      fullWidth
      onChange={handleCount}
      value={equation}
      variant="outlined"
      error={Boolean(equationError)}
      InputProps={{
        className: classes.input,
      }}
    />
  );
};

export default EquationField;
