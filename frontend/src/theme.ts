import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#4ECDC4",
    },
    background: {
      default: "#000000ff",
      paper: "#292F36",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#262c32ff",
          color: "#fff",
        },
      },
    },
  },
});

export default theme;
