import Head from 'next/head';
import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: url('../background-grey.jpg') no-repeat;
    background-size: cover;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-weight: bold;
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
