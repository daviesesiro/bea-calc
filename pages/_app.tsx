import { StateContextProvider } from '../Context'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <StateContextProvider>
      <Component {...pageProps} />
    </StateContextProvider>
  )
}

export default MyApp
