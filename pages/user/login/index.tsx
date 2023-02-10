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
          setPassword('');
        }
      });
  }
  return (
    <>
      <BackButton />

      <form onSubmit={handleSubmit}>
        {errorMsg && <div className="bg-red-500 text-lg">{errorMsg}</div>}
        <EmailInput setter={setEmail} validatesetter={validate} disabled={!isValidate} />
        <PasswordInput setter={setPassword} />
        <Primary as="button" type="submit" name="submitBtn">
          Log in
        </Primary>
      </form>
    </>
  );
}
