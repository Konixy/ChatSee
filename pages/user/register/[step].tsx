import React, { useEffect, useState } from 'react';
import Header from 'components/Header';
import Button, { Primary } from 'components/Buttons';
import BackButton from 'components/BackButton';
import { DateInput, EmailInput, TextInput } from 'components/Inputs';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { Slide } from '@mui/material';
import axios from 'axios';

type Steps = 'mail' | 'name' | 'birth';

export default function Register() {
  const [data, setData] = useState<{ [a: string]: any }>({});
  useEffect(() => {
    console.log(data);
  }, [data]);
  const router = useRouter();
  const [step, setStep] = useState<Steps>(router.query.step as Steps);
  const [loading, setLoading] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!(router.query.step === 'mail' || router.query.step === 'name' || router.query.step === 'birth')) {
      useEffect(() => {
        router.push('/user/register');
      }, []);
    }
    setStep(router.query.step as Steps);
  }, [router.query.step]);

  if (
    !(router.query.step === 'mail' || router.query.step === 'name' || router.query.step === 'birth') ||
    (router.query.step === 'name' && !data.email) ||
    (router.query.step === 'birth' && (!data.email || !data.fullname))
  ) {
    useEffect(() => {
      router.push('/user/register/mail');
    }, []);

    return <></>;
  }

  function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidate) return;
    if (step === 'mail') {
      setLoading(true);
      axios.get<{ result: boolean }>('/api/user/isemailtaken', { data: { email: data.email } }).then((e) => {
        setLoading(false);
        if (e.data.result) return setErrorMsg('email is allready taken');
        else router.push('/user/register/name');
      });
    } else if (step === 'name') {
      return router.push('/user/register/birth');
    }
  }

  function setter(property: string) {
    return (e: any) => setData(Object.assign(data, { [property]: e }));
  }

  const steps: { name: Steps; label: string; input: React.ReactNode }[] = [
    {
      name: 'mail',
      label: 'First, we need your email adress:',
      input: (
        <EmailInput name="email" id="input" setter={setter('email')} validatesetter={setIsValidate} className="my-4" />
      ),
    },
    {
      name: 'name',
      label: 'Next, your full name:',
      input: (
        <TextInput
          placeholder="John Doe"
          name="fullname"
          id="input"
          setter={setter('fullname')}
          validatesetter={setIsValidate}
        />
      ),
    },
    {
      name: 'birth',
      label: 'Next, your date of birth:',
      input: <DateInput validatesetter={setIsValidate} setter={setter('birthDate')} className="my-4" id="input" />,
    },
  ];
  return (
    <>
      <BackButton />
      <div className="absolute left-1/2 flex h-full -translate-x-1/2 flex-col items-center justify-center">
        <form onSubmit={handleForm}>
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

          <Primary as="button" type="submit" px={5} py={2.5} className="text-md mt-40" disabled={!isValidate}>
            {loading ? (
              'loading'
            ) : (
              <>
                Continue <i className="fa-solid fa-arrow-right ml-1 translate-y-[1.5px]" />
              </>
            )}
          </Primary>
        </form>

        {/* <form className="my-10 max-w-lg items-center">
          <div className="mb-6">
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="repeat-password" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Repeat password
            </label>
            <input
              type="password"
              id="repeat-password"
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6 flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="terms"
                type="checkbox"
                value=""
                className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              I agree with the{' '}
              <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">
                terms and conditions
              </a>
            </label>
          </div>
          <Primary as="button" type="submit" px={5} py={2.5} className="text-center text-sm">
            Register
          </Primary>
        </form> */}
      </div>
    </>
  );
}
