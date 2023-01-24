import { useConv } from '@/pages/chat';
import { Conv } from '@/types';
import React, { useEffect } from 'react';
import Message from './Message';

export default function MessageBox({ user }: { user: string }) {
  const { conv } = useConv();

  useEffect(() => {
    console.log(conv);
  }, [conv]);

  return (
    <div className="mx-10 my-10 h-full min-h-full w-40 overflow-y-auto bg-slate-700 sm:w-96">
      {conv.map((e) => (
        <Message key={e.id} extern={e.sender === user} content={e.content} loading={e.loading} />
      ))}
    </div>
  );
}
