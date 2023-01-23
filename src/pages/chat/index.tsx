import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Head from 'next/head';
import { ScriptProps } from 'next/script';
import io from 'socket.io-client';
import { nanoid } from 'nanoid';
import {}

import type { Socket } from 'socket.io-client';
import { Conv, Message } from '@/types';

let socket: undefined | Socket;

function useConv() {
  const [conv, setConv] = useState<Conv>([]);
  function addMessage(message: Message) {
    setConv(conv.concat([message]));
  }
  return { conv, addMessage };
}

export default function index(Props: ScriptProps) {
  const user = 'konixy';
  const [value, setValue] = useState('');
  const { conv, addMessage } = useConv();

  useEffect(() => {
    socketInitializer();
  }, []);

  async function socketInitializer() {
    fetch('/api/socket');
    socket = io();

    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('send-success', (e: Message) => console.log('successfully sended message'));
  }

  function handleSend() {
    const message = { content: value, id: nanoid(), sender: user };
    socket?.emit('submit', message);
    addMessage(Object.assign(message, { loading: true }));
  }
  return (
    <>
      <Header />
      <div className="mt-20 flex flex-col items-center">
        <div className="text-2xl">Chat</div>
        <div className="mt-10 flex flex-row">
          <input type="text" placeholder="message" onChange={(e) => setValue(e.target.value)} />
          <button onClick={handleSend}>Send</button>
          <div>
            {conv.map((e) => (
              <Message key={e.id} extern={e.sender === user} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
