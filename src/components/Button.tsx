import Link, { LinkProps } from 'next/link';
import React from 'react';
import { ComponentPropsWithoutRef } from 'react';

export function Primary(
  Props: { href?: string; type: 'href' | 'link' | 'button' } & React.PropsWithChildren &
    (ComponentPropsWithoutRef<'a'> | ComponentPropsWithoutRef<'button'>),
) {
  const style = 'bg-gradient clay-shadow clay-button rounded-2xl py-2 px-4 transition-all ' + Props.className;
  return Props.type === 'link' ? (
    <Link href={Props.href as string} {...Props} className={style}>
      {Props.children}
    </Link>
  ) : Props.type === 'href' ? (
    <a {...Props} className={style} target="_blank" rel="noreferrer">
      {Props.children}
    </a>
  ) : (
    <button {...(Props as ComponentPropsWithoutRef<'button'>)} className={style}>
      {Props.children}
    </button>
  );
}

export default { Primary };
