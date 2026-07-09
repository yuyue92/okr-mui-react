import { createTheme } from '@mui/material/styles'

const baseTypography = {
  fontFamily: [
    'Inter',
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Microsoft YaHei',
    'sans-serif'
  ].join(','),
  h4: { fontWeight: 800 },
  h5: { fontWeight: 800 },
  h6: { fontWeight: 750 },
  button: { fontWeight: 700, textTransform: 'none' }
}

export function getAppTheme(mode = 'light') {
  const isDark = mode === 'dark'

  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#2563eb'
      },
      secondary: {
        main: '#7c3aed'
      },
      success: {
        main: '#16a34a'
      },
      warning: {
        main: '#f59e0b'
      },
      error: {
        main: '#dc2626'
      },
      background: {
        default: isDark ? '#0f172a' : '#f6f7fb',
        paper: isDark ? '#111827' : '#ffffff'
      }
    },
    shape: {
      borderRadius: 14
    },
    typography: baseTypography,
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none'
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 18
          }
        }
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 700
          }
        }
      }
    }
  })
}
