import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from 'components/Button';
import { useUser } from 'lib/userContext';

export default function Header() {
  const { user, setUser } = useUser();
  return (
    <div className="m-6 flex flex-col items-center justify-evenly text-black dark:text-white sm:flex-row">
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
      <Button.Primary href={user ? '/chat' : '/register'} type="link" px={4} py={2}>
        {user ? 'My chat' : 'Get Started!'}
      </Button.Primary>
    </div>
  );
}
