import React from 'react';
import Home from './index';
import '@/index.scss';
import { AppComponent } from 'next/dist/shared/lib/router/router';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { UserProvider } from 'lib/userContext';

export default function App({ Component, pageProps }: { Component: AppComponent; pageProps: AppProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Chat See</title>
      </Head>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}
