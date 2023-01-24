import { Conv } from '@/types';
import React from 'react';
import Message from './Message';

export default function MessageBox({ messages, user }: { messages: Conv; user: string }) {
  return (
    <div>
      {messages.map((e) => (
        <Message key={e.id} extern={e.sender === user} content={e.content} loading={e.loading} />
      ))}
    </div>
  );
}
