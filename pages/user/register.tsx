import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function Register() {
  const router = useRouter();
  useEffect(() => {
    router.push('/user/register/mail');
  }, []);

  return <></>;
}
