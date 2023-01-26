import Link, { LinkProps } from 'next/link';
import React from 'react';
import { ComponentPropsWithoutRef } from 'react';

export function Primary(
  Props: { href: string; type: 'href' | 'link' } & React.PropsWithChildren & LinkProps & ComponentPropsWithoutRef<'a'>,
) {
  const style = 'bg-gradient clay-shadow rounded-lg py-2 px-4 ' + Props.className;
  return Props.type === 'link' ? (
    <Link {...Props} className={style}>
      {Props.children}
    </Link>
  ) : (
    <a {...Props} className={style} target="_blank" rel="noreferrer">
      {Props.children}
    </a>
  );
}

export default { Primary };
