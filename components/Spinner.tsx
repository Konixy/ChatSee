import React from 'react';

export default function Spinner(Props: React.ComponentPropsWithoutRef<'i'>) {
  return <i {...Props} className={'fa-solid fa-spinner-third animate-spin ' + Props.className} />;
}
