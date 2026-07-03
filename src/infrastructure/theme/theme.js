import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A365D', // Azul Marino Institucional (Profundo y elegante)
      light: '#2B6CB0',
      dark: '#0F1F38',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#C8102E', // Rojo O'Higgins (Carmesí institucional)
      light: '#E53E3E',
      dark: '#9B0A20',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F4F6F8', // Gris perla/azulado ultra suave (reduce fatiga visual)
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3748', // Gris oscuro en lugar de negro puro (más suave para leer)
      secondary: '#718096',
    },
    action: {
      hover: 'rgba(26, 54, 93, 0.04)', // Hover muy sutil
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      color: '#1A365D',
      letterSpacing: '-0.5px',
    },
    h5: {
      fontWeight: 600,
      color: '#1A365D',
    },
    h6: {
      fontWeight: 600,
      color: '#2D3748',
    },
    button: {
      textTransform: 'none', // Botones más modernos sin MAYÚSCULAS forzadas
      fontWeight: 600,
    }
  },
  shape: {
    borderRadius: 10, // Bordes redondeados más amigables
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 24px',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transform: 'translateY(-1px)',
          }
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: '#9B0A20',
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 2px 20px rgba(0, 0, 0, 0.04)', // Sombras mucho más difusas y modernas
        },
        elevation2: {
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          backgroundColor: '#F8FAFC', // Cabeceras de tabla suaves
          color: '#4A5568',
          borderBottom: '2px solid #E2E8F0',
        },
        body: {
          color: '#2D3748',
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(244, 246, 248, 0.5)',
          }
        }
      }
    }
  }
});

export default theme;
