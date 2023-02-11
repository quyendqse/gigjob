import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  // allow configuration using `createTheme`
  interface ThemeOptions {}
  interface TypeText {
    third: string;
    iconColor?: string;
    status: string;
  }
  interface SimplePaletteColorOptions {
    backgroundChip?: string;
    background?: string;
    success?: string;
    colorSideBar?: "#EDF2F7";
  }
}

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#2D3748",
      light: "#2D3748",
      backgroundChip: "#0B2136",
      background: "#0D3B66",
      success: "#117C00",
      colorSideBar: "#EDF2F7",
    },
    secondary: {
      main: "#D55B13",
    },
    error: {
      main: red.A400,
    },
    warning: {
      main: "#EE964B",
      dark: "#E74A3B",
    },
    text: {
      primary: "#000000",
      secondary: "#8B8B8B",
      third: "white",
      iconColor: "#EE964B",
      status: "#D55B13",
    },
    common: {
      black: "#000",
      white: "#fff",
    },
  },
  typography: {
    h1: {
      fontSize: 40,
      lineHeight: "42.19px",
      fontWeight: 800,
    },
    h2: {
      fontStyle: "normal",
      fontSize: 24,
      lineHeight: "29px",
      letterSpacing: "0.2em",
    },
    h3: {
      fontStyle: "normal",
      fontSize: 16,
      lineHeight: "17px",
      fontWeight: 700,
    },
    h4: {
      fontSize: "16px",
      fontWeight: "700",
      lineHeight: "21px",
    },
    h5: {
      fontSize: "18px",
      fontWeight: "400",
      lineHeight: "21.09px",
    },

    h6: {},
    body1: {
      fontSize: 14,
      lineHeight: "16.94px",
    },
    body2: {},
    caption: {
      fontSize: 14,
      lineHeight: "19.36px",
      fontWeight: 400,
    },

    subtitle1: {
      fontSize: 12,
      lineHeight: "14.52px",
    },
    subtitle2: {},
  },
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 400,
  //     md: 768,
  //     lg: 1024,
  //     xl: 1500
  //   }
  // }
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          // margin: 6,
          "& .MuiInputBase-root	": {
            borderRadius: 10,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: 8,
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
  },
});

export default theme;
