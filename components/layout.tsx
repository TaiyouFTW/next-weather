import Head from 'next/head';
import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: url('../background-grey.jpg') no-repeat center center fixed;
  }
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function Layout({ children }: any) {
  return (
    <>
      <Head>
        <title>Weather</title>
        <meta name="description" content="weather app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />
      <main>{children}</main>
    </>
  );
}
