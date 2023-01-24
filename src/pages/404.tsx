import Head from 'next/head';
import React from 'react';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404</title>
      </Head>
      <div className="relative flex h-full w-full flex-auto flex-col items-center justify-center px-4 pt-[20%] text-center sm:flex-row">
        <h1 className="text-2xl font-extrabold tracking-tight text-main dark:text-gray-200 sm:mr-6 sm:border-r sm:border-main/10 sm:pr-6 sm:text-3xl sm:dark:border-gray-300/10">
          404
        </h1>
        <h2 className="mt-2 text-lg text-gray-700 dark:text-gray-400 sm:mt-0">Cette page n&apos;éxiste pas.</h2>
      </div>
    </>
  );
}
