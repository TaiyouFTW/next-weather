import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';

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
`;

export default function Layout({ children }: any) {
  return (
    <>
      <Head>
        <title>Weather</title>
        <meta name="description" content="Weather app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />

        <meta name="title" content="Weather" />
        <meta name="description" content="Weather app" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://weather-ebon-psi.vercel.app/" />
        <meta property="og:title" content="Weather" />
        <meta property="og:description" content="Weather app" />
        <meta property="og:image" content="/background-grey.jpg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://weather-ebon-psi.vercel.app/" />
        <meta property="twitter:title" content="Weather" />
        <meta property="twitter:description" content="Weather app" />
        <meta property="twitter:image" content="/background-grey.jpg" />

      </Head>
      <GlobalStyle />
      <main>{children}</main>
    </>
  );
}
