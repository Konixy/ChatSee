import React, { useEffect, useState, ComponentPropsWithoutRef } from 'react';
import moment from 'moment';
// import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

export function EmailInput(
  Props: {
    validatesetter: (value: boolean) => void;
    setter: (value: string) => void;
  } & ComponentPropsWithoutRef<'input'>,
) {
  const [value, setValue] = useState('');
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;

  useEffect(() => {
    Props.validatesetter(false);
  }, []);

  useEffect(() => {
    Props.setter(value);
    const isMatching = value.match(emailRegex);
    Props.validatesetter(isMatching ? true : false);
  }, [value]);
  return (
    <input
      {...Props}
      type="email"
      placeholder="example@email.com"
      className={'rounded-lg px-5 py-2.5 font-Beau shadow-md ' + Props.className}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

// export function DateInput(Props: { validatesetter: (value: boolean) => void } & ReactDatePickerProps<never, false>) {
//   const [value, setValue] = useState<Date>(new Date());

//   return (
//     <DatePicker
//       {...Props}
//       // className={'rounded-lg px-5 py-2.5 ' + Props.className}
//       selected={value}
//       onChange={(e) => setValue(e || new Date())}
//       wrapperClassName="py-4 px-4 rounded-2xl clay-md-pink"
//       dateFormat="dd/MM/yyyy"
//       allowSameDay={false}
//       previousMonthButtonLabel={<i className="fa-solid fa-arrow-left" />}
//       nextMonthButtonLabel={<i className="fa-solid fa-arrow-right" />}
//       dayClassName={(e) => {
//         e.toString() === value.toString() && console.log('same dates');
//         return 'cursor-pointer ' + (e.toString() === value.toString() ? 'hover:bg-blue-600' : 'hover:bg-gray-200');
//       }}
//       showMonthYearDropdown
//     />
//   );
// }

function formatDate(date: moment.MomentInput): string {
  return moment(date).format('yyyy[-]MM[-]DD');
}

export function DateInput(
  Props: {
    validatesetter: (value: boolean) => void;
    max?: moment.MomentInput;
    setter: (value: Date) => void;
  } & ComponentPropsWithoutRef<'input'>,
) {
  const max = Props.max || Date.now();
  const [value, setValue] = useState(formatDate(Date.now()));

  useEffect(() => {
    Props.setter(new Date(value));
    if (value) Props.validatesetter(true);
    else Props.validatesetter(false);
  }, [value]);

  return (
    <input
      {...Props}
      type="date"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      max={formatDate(max)}
      className={'rounded-lg py-2.5 px-5 font-Beau shadow-md focus:ring-1 focus:ring-violet-700 ' + Props.className}
      data-form-type="date"
    />
  );
}

export function TextInput(
  Props: {
    caractersCount?: number;
    validatesetter?: (value: boolean) => void;
    setter: (value: string) => void;
  } & ComponentPropsWithoutRef<'input'>,
) {
  const [value, setValue] = useState('');
  useEffect(() => {
    Props.setter(value);
    if (Props.caractersCount && Props.validatesetter) {
      if (value.split('').length <= Props.caractersCount) Props.validatesetter(true);
      else Props.validatesetter(false);
    }
  }, [value]);
  return (
    <input
      {...Props}
      className={'rounded-lg px-5 py-2.5 font-Beau shadow-md ' + Props.className}
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
