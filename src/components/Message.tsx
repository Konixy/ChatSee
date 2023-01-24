import React from 'react';

export default function Message({
  content,
  extern,
  loading,
}: {
  content: string;
  extern: boolean;
  loading: boolean | undefined;
}) {
  return (
    <div className={`${extern ? 'text-left' : 'text-right'} ${loading ? 'text-gray-500' : 'text-white'}`}>
      {content}
    </div>
  );
}
