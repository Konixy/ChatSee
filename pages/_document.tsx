import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import Loading from 'pages/loading';

export default function _document() {
  return (
    <Html lang="fr" className="dark">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/images/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Simple chat app" />
        <link rel="apple-touch-icon" href="/images/logo150.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="stylesheet" href="https://kit-pro.fontawesome.com/releases/v6.2.0/css/pro.min.css" />
      </Head>
      <body className="bg-gradient-to-b from-light to-violet-300 dark:from-dark-900 dark:to-violet-900">
        <React.Suspense fallback={<Loading />}>
          <Main />
        </React.Suspense>
        <NextScript />
      </body>
    </Html>
  );
}
