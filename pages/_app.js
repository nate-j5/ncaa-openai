import Head from 'next/head';
import Layout from "../components/Layout";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>OpenAI x NCAA Concept</title>
        <meta name="description" content="Reviews of NCAA programs from college athletes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}