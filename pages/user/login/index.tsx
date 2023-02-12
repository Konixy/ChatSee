import React, { useState } from 'react';
import { BackButton } from 'components/BackButton';
import { EmailInput, PasswordInput } from 'components/Inputs';
import { Primary } from 'components/Buttons';
import axios from 'axios';
import { APIUser } from '@/types';
import { useUser } from '@/userContext';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidate, validate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();
  const { setUser } = useUser();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidate) return;
    setLoading(true);
    setErrorMsg(null);
    axios
      .post<{ success: boolean; message: string; user: APIUser }>('/api/user/login', { email, password })
      .then((r) => {
        setLoading(false);
        if (r.data.success) {
          setUser(r.data.user);
          router.push('/');
        } else {
          setErrorMsg('Email or password are incorrect!');
          console.log(r.data.message);
          setPassword('');
        }
      });
  }
  return (
    <>
      <BackButton />

      <form
        onSubmit={handleSubmit}
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col"
      >
        {errorMsg && <div className="text-lg text-red-500">{errorMsg}</div>}
        <EmailInput setter={setEmail} validatesetter={validate} className="my-4" />
        <PasswordInput setter={setPassword} className="mb-8" />
        <Primary as="button" type="submit" name="submitBtn" disabled={!isValidate || password === ''} loading={loading}>
          Log in
        </Primary>
      </form>
    </>
  );
}
