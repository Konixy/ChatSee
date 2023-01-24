import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function _document() {
  return (
    <Html lang="fr" className="dark">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/images/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Simple chat app" />
        <link rel="apple-touch-icon" href="/images/logo150.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body className="bg-main">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
