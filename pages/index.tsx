import Link from 'next/link';
import React from 'react';
import Header from 'components/Header';
import Button from 'components/Button';

export default function App() {
  return (
    <>
      <Header />
      <div className="centered flex flex-col text-center font-Beau text-6xl font-normal">
        <div>My awesome chat app!</div>
        <div className="flex justify-center">
          <Button.Primary type="button" className="relative mt-6 py-4 px-8 text-xl">
            Test button
          </Button.Primary>
        </div>
      </div>
    </>
  );
}
