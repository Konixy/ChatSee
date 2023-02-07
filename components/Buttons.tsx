import Link, { LinkProps } from 'next/link';
import React from 'react';
import { ComponentPropsWithoutRef } from 'react';

export function Primary(
  Props: { href?: string; as: 'href' | 'link' | 'button'; px?: number; py?: number } & React.PropsWithChildren &
    (ComponentPropsWithoutRef<'a'> | ComponentPropsWithoutRef<'button'>),
) {
  const style =
    `nobg-gradient clay-sm-pink clay-button rounded-3xl py-${Props.py || '4'} px-${
      Props.px || '4'
    } transition-all text-white rounded-clay disabled:bg-pink-300 disabled:cursor-not-allowed ` + Props.className;
  const Children = <div className="translate-y-1">{Props.children}</div>;
  return Props.as === 'link' ? (
    <Link {...(Props as LinkProps)} href={Props.href as string} as="a" className={style}>
      {Props.children}
    </Link>
  ) : Props.as === 'href' ? (
    <a {...(Props as ComponentPropsWithoutRef<'a'>)} className={style} target="_blank" rel="noreferrer">
      {Props.children}
    </a>
  ) : (
    <button {...(Props as ComponentPropsWithoutRef<'button'>)} className={style}>
      {Props.children}
    </button>
  );
}

export default { Primary };
