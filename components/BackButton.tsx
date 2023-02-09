import Link from 'next/link';
import React from 'react';

export function BackButton() {
  return (
    <button className="absolute left-[15%] top-10" onClick={() => window.history.back()}>
      <i className="fa-solid fa-arrow-left mr-2" />
      Retour
    </button>
  );
}

export function MenuButton() {
  return (
    <Link className="absolute left-[15%] top-10" href="/">
      <i className="fa-solid fa-arrow-left mr-2" />
      Retour a l'acceuil
    </Link>
  );
}
