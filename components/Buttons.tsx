import Link, { LinkProps } from 'next/link';
import React from 'react';
import { ComponentPropsWithoutRef } from 'react';
import Spinner from './Spinner';

export function Primary(
  Props: {
    href?: string;
    as: 'href' | 'link' | 'button';
    px?: number;
    py?: number;
    loading?: boolean;
  } & React.PropsWithChildren &
    (ComponentPropsWithoutRef<'a'> | ComponentPropsWithoutRef<'button'>),
) {
  const style =
    `nobg-gradient clay-sm-pink clay-button rounded-3xl py-${Props.py || '4'} px-${
      Props.px || '4'
    } transition-all text-white rounded-clay disabled:bg-pink-300 disabled:cursor-not-allowed ` + Props.className;
  const Children = Props.loading ? (
    <>
      <div className="opacity-0">{Props.children}</div>
      <div className="absolute right-1/2 -translate-y-full translate-x-1/2">
        <Spinner />
      </div>
    </>
  ) : (
    Props.children
  );
  return Props.as === 'link' ? (
    <Link {...(Props as LinkProps)} as={undefined} href={Props.href as string} className={style}>
      {Children}
    </Link>
  ) : Props.as === 'href' ? (
    <a {...(Props as ComponentPropsWithoutRef<'a'>)} className={style} target="_blank" rel="noreferrer">
      {Children}
    </a>
  ) : (
    <button {...(Props as ComponentPropsWithoutRef<'button'>)} className={style}>
      {Children}
    </button>
  );
}

export default { Primary };
