import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#0634DB",
      dark: "#0634DB",
    },
    secondary: {
      main: "#fff",
      light: "#fff",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1300,
      // lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "5rem",
      //? 80px updated
      lineHeight: "100%",
      color: "#24282B",
    },
    h2: {
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "3.062rem",
      // 49px
      lineHeight: "120%",
      color: "#24282B",
    },
    h3: {
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "2.438rem",
      // 39px
      lineHeight: "100%",
      color: "#24282B",
    },
    h4: {
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "1.938rem",
      // 31px
      lineHeight: "120%",
      color: "#24282B",
    },
    h5: {
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "1.5rem",
      //?updated 24px
      lineHeight: "120%",
      color: "#24282B",
    },
    h6: {
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "1.250rem",
      // 20px
      lineHeight: "120%",
      color: "#24282B",
    },
    body1: {
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "1.000rem",
      //? 16px updated
      lineHeight: "150%",
      color: "#24282B",
    },
    body2: {
      //? updated
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "0.875rem",
      // 14px
      lineHeight: "normal",
      // fontFamily: "Inter",
      color: "#24282B",
    },
    subtitle1: {
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "0.625rem",
      // 10px
      color: "#24282B",
      lineHeight: "120%",
    },
    subtitle2: {},
  },
});

const theme = {
  ...defaultTheme,
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          boxShadow: "0px 6px 24px -4px rgba(145, 158, 171, 0.19)",
          borderColor: "rgba(145, 158, 171, 0.19)",
          borderRadius: "12px",
          "& fieldset": {
            borderColor: "rgba(145, 158, 171, 0.19)",
            borderRadius: "12px",
          },
          "& .MuiOutlinedInput-root:hover": {
            "& > fieldset": {
              borderRadius: "12px",
            },
          },
          "& input:-webkit-autofill": {
            borderRadius: "12px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "unset",
          borderRadius: "12px",
          // padding: "10px 30px",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        // h4: {
        //   [defaultTheme.breakpoints.down(900)]: {
        //     fontSize: "25px",
        //   },
        // },
      },
    },
  },
};

export default theme;
