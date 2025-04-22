import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

// Font Kanit ทุกหน้า
const theme = createTheme({
  typography: {
    fontFamily: [
      'Kanit',
    ].join(','),
  },
})

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
