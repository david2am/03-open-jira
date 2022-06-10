import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { darkTheme } from '../themes';
import { UIProvider } from '../context/ui';
import { EntriesProvider } from '../context/entries/EntriesProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <UIProvider>
        <EntriesProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </EntriesProvider>
      </UIProvider>
    </ThemeProvider>
  )
}

export default MyApp
