import { createStyles, makeStyles, Theme } from "@material-ui/core";
import useContext, { AppProvider, Page } from "./appContext";
import Home from "./pages/home";
import EditEquation from "./pages/editEquation";

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
        <Router />
      </div>
    </AppProvider>
  );
};

export default App;

const pages: Record<Page, () => JSX.Element> = {
  [Page.HOME]: Home,
  [Page.QUERY_EDIT]: EditEquation,
};

const Router = () => {
  const { page } = useContext();
  const CurrentPage = pages[page] || Home;
  return <CurrentPage />;
};
