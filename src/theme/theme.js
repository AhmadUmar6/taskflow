import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#58CC02', // Duolingo Green
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1cb0f6', // Duolingo Blue
      lightest: '#e3f3fd', // Custom lightest shade for secondary
    },
    background: {
      default: '#f7f7f7',
      paper: '#ffffff',
    },
    error: {
      main: '#ff4b4b',
    },
    warning: {
        main: '#ffc800',
    },
    success: {
        main: '#58CC02',
    }
  },
  typography: {
    fontFamily: '"Nunito", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 900 },
    h2: { fontWeight: 900 },
    h3: { fontWeight: 900 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 20px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                borderRadius: 16,
            }
        }
    }
  },
});