import {
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useEffect, useState } from "react";
import RollButton from "../../../components/RollButton";
import {
  getAllEquations,
  deleteEquation,
  Equation,
} from "../../../utils/equation";
import useContext from "../../../appContext";

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
  const { handleUseEquation } = useContext();

  const [equations, setEquations] = useState<Equation[]>([]);

  useEffect(() => {
    fetchEquations();
  }, []);

  const fetchEquations = async () => {
    const equations = await getAllEquations();
    setEquations(equations);
  };

  const handleDeleteEquation = (equation: Equation) => async () => {
    await deleteEquation(equation);
    await fetchEquations();
  };

  return (
    <section className={classes.sidebar}>
      <RollButton />
      <List>
        {equations.map((equation) => {
          return (
            <ListItem key={equation.name}>
              <ListItemText
                primary={equation.name}
                secondary={equation.definition}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={handleDeleteEquation(equation)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => handleUseEquation(equation)}
                >
                  <PlayArrowIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </section>
  );
};

export default Sidebar;
