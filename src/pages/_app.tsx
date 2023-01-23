import React from 'react';
import Home from './index';
import '@/index.scss';
import { AppComponent } from 'next/dist/shared/lib/router/router';
import { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: { Component: AppComponent; pageProps: AppProps }) {
  return (
    <>
      <Head>
        <title>Chat See</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
