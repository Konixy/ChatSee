import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from 'components/Button';
import { useUser } from 'lib/userContext';

export default function Header() {
  const { user } = useUser();
  return (
    <div className="m-6 flex flex-col items-center justify-evenly text-white sm:flex-row">
      <Link href="/" className="flex select-none flex-row items-center font-Beau text-4xl font-normal">
        chat see
      </Link>
      <Link href="/" className="flex select-none flex-row items-center font-Beau text-4xl font-normal">
        <Image
          src={'/images/logo1.svg'}
          alt="Chat See"
          width={75}
          height={75}
          className="mr-2 block bg-cover bg-no-repeat"
        />
      </Link>
      {user ? (
        <Button.Primary href="/chat" type="link">
          My chat
        </Button.Primary>
      ) : (
        <Button.Primary href="/user/register" type="link">
          Get stared!
        </Button.Primary>
      )}
    </div>
  );
}
