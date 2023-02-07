import Link, { LinkProps } from 'next/link';
import React from 'react';
import { ComponentPropsWithoutRef } from 'react';

export function Primary(
  Props: { href?: string; type: 'href' | 'link' | 'button'; px?: number; py?: number } & React.PropsWithChildren &
    (ComponentPropsWithoutRef<'a'> | ComponentPropsWithoutRef<'button'>),
) {
  const style =
    `bg-gradient clay-md-violet clay-button rounded-3xl py-${Props.py || '4'} px-${
      Props.px || '4'
    } transition-all text-white rounded-clay ` + Props.className;
  const Children = <div className="translate-y-1">{Props.children}</div>;
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
