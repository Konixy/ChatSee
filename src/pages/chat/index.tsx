import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Head from 'next/head';
import { ScriptProps } from 'next/script';
import io from 'socket.io-client';

import type { Socket } from 'socket.io-client';

let socket: undefined | Socket;

export default function index(Props: ScriptProps) {
  const [value, setValue] = useState('');

  useEffect(() => {
    socketInitializer();
  }, []);

  async function socketInitializer() {
    fetch('/api/socket');
    socket = io();

    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('send-success', () => console.log('successfully sended message'));
  }

  function handleSend() {
    socket?.emit('submit', value);
  }
  return (
    <>
      <Header />
      <div className="mt-20 flex flex-col items-center">
        <div className="text-2xl">Chat</div>
        <div className="mt-10 flex flex-row">
          <input type="text" placeholder="message" onChange={(e) => setValue(e.target.value)} />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </>
  );
}
