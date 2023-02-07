import React from 'react';

export default function BackButton() {
  return (
    <button className="absolute left-[15%] top-10" onClick={() => window.history.back()}>
      <i className="fa-solid fa-arrow-left mr-2" />
      Retour a l'acceuil
    </button>
  );
}
