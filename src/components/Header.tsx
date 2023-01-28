import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import { useUser } from '@/userContext';

export default function Header() {
  const { user, setUser } = useUser();
  return (
    <div className="m-6 flex flex-col items-center justify-evenly text-white sm:flex-row">
      <Link href="/" className="flex select-none flex-row items-center font-Beau text-4xl font-normal">
        <Image
          src={'/images/logo.svg'}
          alt="Chat See"
          width={48}
          height={48}
          className="mr-2 block bg-cover bg-no-repeat"
        />
        chat see
      </Link>
      {user ? (
        <Button.Primary href="/chat" type="link">
          Start chatting
        </Button.Primary>
      ) : (
        <button onClick={() => setUser({ username: 'Konixy', email: 'konixy.p@gmail.com', online: true })}>
          Log in
        </button>
      )}
    </div>
  );
}
