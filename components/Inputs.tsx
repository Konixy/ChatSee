import React, { useEffect, useState, ComponentPropsWithoutRef } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

export function EmailInput(Props: { validateSetter: (value: boolean) => void } & ComponentPropsWithoutRef<'input'>) {
  const [value, setValue] = useState('');
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;

  useEffect(() => {
    Props.validateSetter(false);
  }, []);

  useEffect(() => {
    const isMatching = value.match(emailRegex);
    Props.validateSetter(isMatching ? true : false);
  }, [value]);
  return (
    <input
      {...Props}
      type="email"
      placeholder="example@email.com"
      className={'rounded-lg px-5 py-2.5 ' + Props.className}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export function DateInput(Props: { validateSetter: (value: boolean) => void } & ReactDatePickerProps<never, false>) {
  const [value, setValue] = useState<Date>(new Date());

  return (
    <DatePicker
      {...Props}
      // className={'rounded-lg px-5 py-2.5 ' + Props.className}
      selected={value}
      onChange={(e) => setValue(e || new Date())}
    />
  );
}
