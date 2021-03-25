import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { AppProvider } from "./appContext";
import Main from "./sections/Main";
import Sidebar from "./sections/Sidebar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      background: theme.palette.common.white,
      display: "flex",
    },
  })
);

const App = () => {
  const classes = useStyles();
  return (
    <AppProvider>
      <div className={classes.page}>
        <Main />
        <Sidebar />
      </div>
    </AppProvider>
  );
};

export default App;
