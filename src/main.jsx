import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import App from './App.jsx'
import { OkrProvider } from './context/OkrContext.jsx'
import { getAppTheme } from './theme/index.js'
import './index.css'

function Root() {
  return (
    <OkrProvider>
      <ThemeBridge />
    </OkrProvider>
  )
}

function ThemeBridge() {
  const mode = localStorage.getItem('okr-theme-mode') || 'light'
  const [themeMode, setThemeMode] = React.useState(mode)

  React.useEffect(() => {
    window.__setOkrThemeMode = setThemeMode
    return () => {
      delete window.__setOkrThemeMode
    }
  }, [])

  return (
    <ThemeProvider theme={getAppTheme(themeMode)}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />)
