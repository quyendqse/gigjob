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
      main: "#a23f00",
      background: "#ffffff",
      backgroundChip: "#ffdbcc",
      contrastText: "#ffffff",
      light: "#ffb695",
      dark: "#8e3700",
    },
    secondary: {
      main: "#a33e00",
      background: "#ffffff",
      backgroundChip: "#ffdbcd",
      contrastText: "#360f00",
      light: "#ff8c55",
      dark: "#351000",
    },
    error: {
      main: "#ba1a1a",
      light: "##ff897d",
      dark: "#410002",
      background: "#ffffff",
      backgroundChip: "#ffdad6",
      contrastText: "#410002",
    },
  },
  typography: {
    //   h1: {
    //     fontSize: 40,
    //     lineHeight: "42.19px",
    //     fontWeight: 700,
    //   },
    //   h2: {
    //     fontStyle: "normal",
    //     fontSize: 24,
    //     lineHeight: "29px",
    //     fontWeight: 600,
    //   },
    // h3: {
    //   fontStyle: "normal",
    //   fontSize: 16,
    //   lineHeight: "17px",
    //   fontWeight: 500,
    // },
    h4: {
      fontWeight: "700",
      lineHeight: "24px",
    },
    h5: {
      fontWeight: "600",
      lineHeight: "22px",
      color: "#351000",
    },
    h6: {},
    body1: {
      lineHeight: "24px",
      color: "#351000",
    },
    body2: {},
    caption: {
      fontSize: 14,
      lineHeight: "19.36px",
      fontWeight: 400,
    },
  },
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
    MuiPaper: {
      styleOverrides: {
        root: {
          boxSizing: "unset",
          borderRight: "none",
          width: 320,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: "0rem 1rem",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          ":hover": {
            borderRadius: "8px",
          },
          height: "3rem",
          margin: "0.25rem 0",
          borderRadius: "8px",
          "&.Mui-selected": {
            borderRadius: "8px",
            backgroundColor: "#f9dcce",
            ":hover": {
              backgroundColor: "#transparent",
            },
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontFamily: "Open Sans",
          fontSize: "16px",
          lineHeight: "22px",
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          background: "#ffffff",
          boxShadow: "2px 4px 14px rgba(0, 0, 0, 0.14)",
          borderRadius: "24px",
          padding: "8px 16px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ":hover": {
            borderRadius: "12px",
          },
          fontSize: "18px",
          padding: "1rem",
        },
      },
    },
  },
});

export default theme;
