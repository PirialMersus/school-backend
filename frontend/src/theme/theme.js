import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#660513',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        .MuiButton-root {
          border: 1px solid yellow;
        }
        .MuiButton-root:hover {
          background-color: green;
        }
      `,
    },
  },
});

