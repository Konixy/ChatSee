import React from 'react';
import { useRouter } from 'next/router';

export default function Login({}) {
  const router = useRouter();
  const redirectUrl = (router.query.redirect as string) || '/';
  function makeRedirect() {
    router.push(redirectUrl);
  }
  return (
    <div>
      login <button onClick={makeRedirect}>redirect</button>
    </div>
  );
}
