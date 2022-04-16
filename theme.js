import { createTheme } from '@mui/material/styles';
import { red, black } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#1D9BF0',
    },
    twitterColor: {
      main: '#1D9BF0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    mainIconColor: {
      main: '#1D9BF0'
    },
    black: {
      main: "black"
    },
    likeIconColor: {
    main: "#d613d0"
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});

export default theme;
