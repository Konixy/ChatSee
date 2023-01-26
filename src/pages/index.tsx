import Link from 'next/link';
import React from 'react';
import Header from '@/components/Header';
import Button from '@/components/Button';

export default function App() {
  return (
    <>
      <Header />
      <div className="centered text-center font-Beau text-6xl font-normal">
        <div>My awesome chat app!</div>
        <Button.Primary href="/404" type="link" className="mt-6 py-4 px-8 text-xl">
          Test 404 page
        </Button.Primary>
      </div>
    </>
  );
}
