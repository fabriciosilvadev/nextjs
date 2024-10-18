import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import "../styles/global.css";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Nextflix</title>
        <meta name="description" content="Netflix clone, made using Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
