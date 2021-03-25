import { createMuiTheme } from "@material-ui/core";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {}
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {}
}

const theme = createMuiTheme({});

export default theme;
