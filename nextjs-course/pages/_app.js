// App JS is your application shell. You can imagine app JS as the root component inside of the body section of your HTML document

import Head from 'next/head';
import Layout from '../components/layout/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Arturo's Next Event</title>
        <meta 
          name="description" 
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        />
        <meta 
          name="viewport" 
          content="initial-scale=1.0, width=device-width"   
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
