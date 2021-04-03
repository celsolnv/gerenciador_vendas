import Layout from '../components/Layout';
import {CssBaseline} from '@material-ui/core'
import  Head  from 'next/head';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';
import PropTypes from 'prop-types';

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  
  return (
    <>
      <Head>
          <meta name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
            key="Viewport"
          />
          <title>Gerenciador de vendas</title>
      </Head>
      <Layout>
        <CssBaseline/>
        <Component {...pageProps} />
      </Layout>
    
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp
