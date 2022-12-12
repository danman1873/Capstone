import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
// page that handles the session provider and props

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp