import React, { useEffect, useState } from 'react';
import { Primary } from 'components/Buttons';
import { BackButton } from 'components/BackButton';
import { DateInput, EmailInput, PasswordInput, TextInput } from 'components/Inputs';
import { useRouter } from 'next/router';
import { Slide } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { APIUser } from '@/types';
import { useUser } from '@/userContext';

type Steps = 'mail' | 'name' | 'birth' | 'verifyemail' | 'password';

export default function Register() {
  const [data, setData] = useState<{ [a: string]: any }>({});
  useEffect(() => {
    console.log(data);
  }, [data]);
  const router = useRouter();
  const [step, setStep] = useState<Steps>(router.query.step as Steps);
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!data.username) return;
    if (data.username === '') return setIsValidate(false);
    const usernameRegex = /^(?=.{4,16}$)[a-zA-Z0-9._-]+$/g;
    if (!data.username.match(usernameRegex)) {
      setIsValidate(false);
      if (!data.username.match(/^(?=.{4,16}$)/)) setErrorMsg('Username must contain between 8 and 16 characters');
      else if (!data.username.match(/^[a-zA-Z0-9._-]+$/))
        setErrorMsg('Username must not contain space or specials characters');
      else setErrorMsg('Incorrect username');
    } else {
      setErrorMsg(null);
      setIsValidate(true);
    }
  }, [data.username]);

  useEffect(() => {
    if (!data.password) return;
    if (data.password === '') return setIsValidate(false);
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!data.password.match(passwordRegex)) {
      setErrorMsg("password don't match the regex");
      setIsValidate(false);
    } else if (data.password === data.verifyPassword) {
      setErrorMsg(null);
      setIsValidate(true);
    } else {
      setErrorMsg('You must provide the same password for both fields');
      setIsValidate(false);
    }
  }, [data.password, data.verifyPassword]);

  useEffect(() => {
    if (
      !(
        router.query.step === 'mail' ||
        router.query.step === 'name' ||
        router.query.step === 'birth' ||
        router.query.step === 'verifyemail' ||
        router.query.step === 'password'
      )
    ) {
      try {
        useEffect(() => {
          router.push('/user/register/mail');
        }, []);
      } catch (err) {
        router.push('/user/register/mail');
      }
    }
    setStep(router.query.step as Steps);
  }, [router.query.step]);

  if (
    !(
      router.query.step === 'mail' ||
      router.query.step === 'name' ||
      router.query.step === 'birth' ||
      router.query.step === 'password'
    ) ||
    (router.query.step === 'password' && !data.email) ||
    (router.query.step === 'name' && !data.email && !data.password) ||
    (router.query.step === 'birth' && (!data.email || !data.fullname))
  ) {
    try {
      useEffect(() => {
        router.push('/user/register/mail');
      }, []);
    } catch (err) {
      router.push('/user/register/mail');
    }

    return <></>;
  }

  function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidate) return;
    if (step === 'mail') {
      setLoading(true);
      axios.post<{ result: boolean }>('/api/user/isemailtaken', { email: data.email }).then((r) => {
        setLoading(false);
        if (r.data.result) return setErrorMsg('email is allready taken');
        else {
          setIsValidate(false);
          setErrorMsg(null);
          router.push('/user/register/password');
        }
      });
    } else if (step === 'password') {
      if (data.password === '') return;
      router.push('/user/register/name');
    } else if (step === 'name') {
      if (data.username === '') return;
      setLoading(true);
      axios.post<{ result: boolean }>('/api/user/isusernametaken', { username: data.username }).then((r) => {
        setLoading(false);
        if (r.data.result) return setErrorMsg('username is allready taken');
        else {
          setErrorMsg(null);
          router.push('/user/register/birth');
        }
      });
    } else if (step === 'birth') {
      if (!data.email || !data.username || !data.fullname || !data.password || !data.birthDate) return;
      setLoading(true);
      axios
        .post<{ user: APIUser; success: boolean; message: string }>('/api/user/register', {
          email: data.email,
          password: data.password,
          birthDate: data.birthDate,
          username: data.username,
          fullname: data.fullname,
        })
        .then((r) => {
          setLoading(false);
          if (r.data.success) {
            setErrorMsg(null);
            setUser(r.data.user);
            router.push('/chat');
          } else {
            setErrorMsg(r.data.message);
            console.log(r.data);
          }
        });
    }
  }

  function setter(property: string) {
    return (e: any) => setData(Object.assign({}, data, { [property]: e }));
  }

  const steps: { name: Steps; label: string; input: React.ReactNode }[] = [
    {
      name: 'mail',
      label: 'First, we need your email adress:',
      input: (
        <>
          {errorMsg && <div className="mt-2 text-center text-red-600">{errorMsg}</div>}
          <EmailInput
            name="email"
            id="input"
            setter={setter('email')}
            validatesetter={setIsValidate}
            className="my-4"
            defaultValue={data.email || ''}
          />
        </>
      ),
    },
    {
      name: 'name',
      label: 'Next, your full name and username:',
      input: (
        <>
          <TextInput
            placeholder="John Doe"
            name="fullname"
            id="input"
            setter={setter('fullname')}
            validatesetter={setIsValidate}
            className="my-4"
            defaultValue={data.fullname || ''}
          />
          {errorMsg && <div className="mt-2 text-center text-red-600">{errorMsg}</div>}
          <TextInput
            placeholder="Konixy"
            name="username"
            setter={setter('username')}
            validatesetter={setIsValidate}
            defaultValue={data.username || ''}
          />
        </>
      ),
    },
    {
      name: 'password',
      label: 'Choose a strong password:',
      input: (
        <>
          {errorMsg && <div className="mt-2 text-center text-red-600">{errorMsg}</div>}
          <PasswordInput
            placeholder="Your password"
            name="password"
            id="input"
            setter={setter('password')}
            className="my-4"
            defaultValue={data.password || ''}
          />
          <label htmlFor="repeatPassword" className="text-lg">
            Confirm password
          </label>
          <PasswordInput
            placeholder="Repeat your password"
            name="repeatPassword"
            id="repeatPassword"
            setter={setter('verifyPassword')}
            isEqualTo={data.password}
          />
        </>
      ),
    },
    {
      name: 'birth',
      label: 'Next, your date of birth:',
      input: (
        <DateInput
          validatesetter={setIsValidate}
          setter={setter('birthDate')}
          className="my-4"
          id="input"
          defaultValue={data.birthDate}
        />
      ),
    },
    { name: 'verifyemail', label: 'Finally, you need to verify your email adress', input: <>test</> },
  ];
  return (
    <>
      <BackButton />
      <form
        onSubmit={handleForm}
        className="absolute left-1/2 flex h-full -translate-x-1/2 flex-col items-center justify-center text-center"
      >
        {steps.map((e) => (
          <Slide direction={step === e.name ? 'left' : 'right'} in={step === e.name} mountOnEnter unmountOnExit>
            <div className="absolute">
              <label htmlFor="input" className="text-2xl">
                {e.label}
              </label>
              <br />
              {e.input}
            </div>
          </Slide>
        ))}

        <Primary
          as="button"
          type="submit"
          px={5}
          py={2.5}
          className="text-md"
          style={{ marginTop: step === 'name' || step === 'password' ? '320px' : '230px' }}
          disabled={!isValidate || loading}
          loading={loading}
        >
          {step === 'birth' ? (
            'Create account'
          ) : (
            <>
              Continue <i className="fa-solid fa-arrow-right ml-1 translate-y-[1.5px]" />
            </>
          )}
        </Primary>
        <div className="mt-2 text-sm">
          Allready have an account ?{' '}
          <Link href="/user/login" className="cursor-pointer text-blue-700 hover:underline">
            Sign in
          </Link>
          .
        </div>
      </form>
    </>
  );
}
