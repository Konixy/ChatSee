import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="flex flex-row items-center justify-evenly text-white">
      <Link href="/" className="flex select-none flex-row items-center font-Beau text-4xl">
        <Image
          src={'/images/logo500.png'}
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
