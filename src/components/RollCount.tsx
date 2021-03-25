import { TextField, makeStyles, createStyles, Theme } from "@material-ui/core";
import { ChangeEvent, useState } from "react";
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

const RollCount = () => {
  const classes = useStyles();
  const { dice, handleSetDice } = useContext();
  const [value, setValue] = useState(dice);

  const handleCount = (event: ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(event.target.value);
    setValue(parsedValue);
    handleSetDice(parsedValue);
  };

  const hasError = isNaN(value) || value < 1;

  return (
    <TextField
      type="number"
      onChange={handleCount}
      value={String(value)}
      variant="outlined"
      error={hasError}
      helperText={hasError && "Must be a number a positive number"}
      InputProps={{
        className: classes.input,
      }}
    />
  );
};

export default RollCount;
