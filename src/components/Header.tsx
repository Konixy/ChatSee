import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="m-6 flex flex-col items-center justify-evenly text-white sm:flex-row">
      <Link href="/" className="flex select-none flex-row items-center font-Beau text-4xl">
        <Image
          src={'/images/logo150.png'}
          alt="Chat See"
          width={48}
          height={48}
          className="mr-2 block bg-cover bg-no-repeat"
        />
        chat see
      </Link>
      <Link href="/chat">Start chatting</Link>
    </div>
  );
}
