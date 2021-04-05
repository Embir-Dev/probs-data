import {
  darken,
  Table,
  TableCell,
  TableContainer,
  Toolbar,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  makeStyles,
  createStyles,
  Theme,
  Tooltip,
  Typography,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import RefreshIcon from "@material-ui/icons/Refresh";
import useContext, { Page, Result } from "../appContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: "auto",
      flex: 1,
      display: "flex",
    },
    results: {
      flex: 1,
      margin: theme.spacing(2),
    },
    result: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
      backgroundColor: darken(theme.palette.background.paper, 0.02),
    },
  })
);

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight: {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.secondary.light,
  },
  title: {
    flex: "1 1 100%",
  },
  subtitle: {
    flex: "1 1 100%",
  },
}));

const Results = () => {
  const { results, setPage, handleSetEquation, handleSetName } = useContext();
  const classes = useStyles();
  const toolbarClasses = useToolbarStyles();

  const handleReuseEquation = (result: Result) => () => {
    handleSetEquation(result.equation);
  };

  const handleEditEquation = (result: Result) => () => {
    if (result.name) handleSetName(result.name);
    handleSetEquation(result.equation);
    setPage(Page.QUERY_EDIT);
  };

  return (
    <div className={classes.root}>
      <div className={classes.results}>
        {results.map((r) => (
          <div className={classes.result} key={r.timestamp}>
            <Paper className={classes.paper}>
              <Toolbar className={toolbarClasses.root}>
                <Typography
                  className={toolbarClasses.title}
                  color="inherit"
                  variant="subtitle1"
                  component="div"
                >
                  {r.dice} * {r.name || r.equation}
                </Typography>

                <Tooltip title="Reuse Equation">
                  <IconButton onClick={handleReuseEquation(r)}>
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title={`${r.name ? "Edit" : "Save"} Equation`}>
                  <IconButton onClick={handleEditEquation(r)}>
                    {r.name ? <EditIcon /> : <SaveIcon />}
                  </IconButton>
                </Tooltip>
              </Toolbar>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Roll</TableCell>
                      {r.data[0].map((d: any, i: number) => (
                        <TableCell align="left" key={d.name}>
                          {d.name}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {r.data.map((data, i) => (
                      <TableRow key={i}>
                        <TableCell>#{i + 1}</TableCell>
                        {data.map((d: any) => (
                          <TableCell key={d.name}>{d.value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
