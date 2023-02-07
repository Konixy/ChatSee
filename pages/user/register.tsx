import React, { useState } from 'react';
import Header from 'components/Header';
import Button, { Primary } from 'components/Buttons';
import BackButton from 'components/BackButton';
import { DateInput, EmailInput } from 'components/Inputs';
import DatePicker from 'react-datepicker';

export default function Register() {
  const [step, setStep] = useState(0);
  const [isValidate, setIsValidate] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidate) return;
    setStep(step + 1);
  }
  return (
    <>
      <BackButton />
      <div className="absolute left-1/2 flex h-full -translate-x-1/2 flex-col items-center justify-center">
        <form onSubmit={handleForm}>
          <label htmlFor="emailInput" className="text-2xl">
            {step === 0 ? 'First, we need your email adress:' : step === 1 ? 'Next, your date of birth:' : ''}
          </label>
          <br />
          {step === 0 ? (
            <EmailInput name="email" id="emailInput" validateSetter={setIsValidate} className="my-4" />
          ) : step === 1 ? (
            <DateInput validateSetter={setIsValidate} className="my-4" />
          ) : (
            step
          )}

          <br />
          <Primary as="button" type="submit" px={5} py={2.5} className="text-md" disabled={!isValidate}>
            Continue <i className="fa-solid fa-arrow-right ml-1 translate-y-[1.5px]" />
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
