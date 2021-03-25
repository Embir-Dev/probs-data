import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import useContext from "../appContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    results: {
      overflow: "auto",
      flex: 1,
      width: "100%",
    },
    result: {
      margin: theme.spacing(4),
      width: `calc(70vw - ${theme.spacing(4 * 2)}px)`,
    },
  })
);

const Results = () => {
  const { results } = useContext();
  const classes = useStyles();
  return (
    <div className={classes.results}>
      {results.map((r) => (
        <TableContainer
          component={Paper}
          className={classes.result}
          key={r.timestamp}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>{r.equation}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {r.data.map((d, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    Roll #{i + 1}
                  </TableCell>
                  <TableCell>{d}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ))}
    </div>
  );
};

export default Results;
