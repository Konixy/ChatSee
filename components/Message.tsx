import { APIUser } from '@/types';
import React from 'react';

export default function Message({
  content,
  extern,
  loading,
  sender,
}: {
  content: string;
  extern: boolean;
  loading: boolean | undefined;
  sender: APIUser;
}) {
  return (
    <div className={`${extern ? 'text-right' : 'text-left'} ${loading ? 'text-gray-700' : 'text-black'}`}>
      <div className="mb-1 text-white">{sender.username}</div>
      {content}
    </div>
  );
}
