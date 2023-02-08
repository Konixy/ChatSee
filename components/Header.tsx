import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from 'components/Buttons';
import { useUser } from 'lib/userContext';

export default function Header() {
  const { user } = useUser();
  return (
    <div className="m-6 flex flex-col items-center justify-evenly text-black dark:text-white sm:flex-row">
      <Link href="/" className="flex select-none flex-row items-center font-Beau text-4xl font-normal">
        chat see
      </Link>
      <Link href="/" className="flex select-none flex-row items-center font-Beau text-4xl font-normal">
        <Image
          src={'/images/logo150.png'}
          alt="Chat See"
          width={75}
          height={75}
          className="mr-2 block bg-cover bg-no-repeat"
        />
      </Link>
      <Button.Primary href={user ? '/chat' : '/user/register/mail'} as="link" px={4} py={2}>
        {user ? 'My chat' : 'Get Started!'}
      </Button.Primary>
    </div>
  );
}
