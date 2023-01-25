import Link from 'next/link';
import React from 'react';
import Header from '@/components/Header';

export default function App() {
  return (
    <>
      <Header />
      <div className="centered text-center font-Beau text-6xl">
        <div>My awesome chat app!</div>
        <Link href="/404" className="mt-6 rounded-md bg-second py-4 px-6 text-xl">
          Test 404 page
        </Link>
      </div>
    </>
  );
}
