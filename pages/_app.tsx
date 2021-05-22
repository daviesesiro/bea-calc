import { StateContextProvider } from '../Context'
import '../styles/globals.css'
import Metas from '../components/Metas'

function MyApp({ Component, pageProps }) {
  return (
    <StateContextProvider>
      <Metas />
      <Component {...pageProps} />
    </StateContextProvider>
  )
}

export default MyApp
