import {
  Button,
  createStyles,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  makeStyles,
  Theme,
} from "@material-ui/core";
import EquationField from "../../components/EquationField";
import useContext, { Page } from "../../appContext";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    form: {
      "& .MuiTextField-root": {
        display: "flex",
        flexDirection: "column",
        margin: theme.spacing(1),
        width: "50vw",
      },
    },
    submit: {
      display: "flex",
      justifyContent: "center",
    },
    submitButton: {
      width: "25vw",
    },
  })
);

const EditEquation = () => {
  const classes = useStyles();
  const [error, setError] = useState<string | undefined>();
  const { name, handleSetName, upsertEquation, setPage } = useContext();
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSetName(e.target.value);
    setError(undefined);
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const newError = await upsertEquation();
    if (!newError) setPage(Page.HOME);
    else setError(newError);
  };
  return (
    <div className={classes.root}>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <FormControl error={Boolean(error)} fullWidth>
          <InputLabel htmlFor="component-error">Name</InputLabel>
          <Input value={name} onChange={handleNameChange} />
          {error && (
            <FormHelperText id="component-error-text">{error}</FormHelperText>
          )}
        </FormControl>
        <EquationField />
        <div>
          <div className={classes.submit}>
            <Button
              color="secondary"
              variant="outlined"
              className={classes.submitButton}
              onClick={() => setPage(Page.HOME)}
            >
              Cancel
            </Button>
          </div>
          <div className={classes.submit}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.submitButton}
              disabled={Boolean(error)}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditEquation;
