import React, { createContext, FormEvent, useContext, useEffect, useState } from 'react';
import Header from '@/components/Header';
import Head from 'next/head';
import { ScriptProps } from 'next/script';
import io from 'socket.io-client';
import { nanoid } from 'nanoid';
import Message from '@/components/Message';

import type { Socket } from 'socket.io-client';
import { Conv, MessageType } from '@/types';
import MessageBox from '@/components/MessageBox';
const ConvContext = createContext<{
  conv: Conv;
  setConv: React.Dispatch<React.SetStateAction<Conv>>;
}>({
  conv: [],
  setConv: () => {
    return;
  },
});
const user = nanoid();

export const useConv = () => useContext(ConvContext);

let socket: undefined | Socket;

function Index(Props: ScriptProps) {
  const [value, setValue] = useState('');
  const { conv, setConv } = useConv();
  const valueRegex = /[\S\s]+[\S]+/;

  useEffect(() => {
    socketInitializer();
  }, []);

  async function socketInitializer() {
    fetch('/api/socket');
    socket = io();

    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('message', (e: MessageType) => {
      console.log('recieved a message:', e);
      resolveMessage(e);
    });
  }

  function addMessage(message: MessageType) {
    setConv([...conv, message]);
  }

  function resolveMessage(message: MessageType) {
    const targetMessage = conv.find((e) => e.loading && e.id === message.id);
    if (targetMessage) targetMessage.loading = false;
    else addMessage(Object.assign(message, { loading: false }) as MessageType);
  }

  function handleSend(e: FormEvent) {
    e.preventDefault();
    if (!value.match(valueRegex)) return;
    const message = { content: value, id: nanoid(), sender: user };
    socket?.emit('submit', message);
    addMessage(Object.assign(message, { loading: true }));
    setValue('');
  }
  return (
    <>
      <Header />
      <div className="mt-20 flex flex-col items-center">
        <div className="text-2xl">Chat</div>
        <MessageBox user={user} />
        <form onSubmit={handleSend} className="bottom-0 mt-10 mb-10 flex flex-row">
          <input
            className="rounded-md bg-gray-50 py-2 px-4 text-black outline-none placeholder:text-gray-500"
            type="text"
            placeholder="message"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <input
            type="submit"
            disabled={!value.match(valueRegex)}
            className="inline-bloc ml-6 w-[10px] bg-second py-2 px-4 hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-second/50"
            style={{
              WebkitMask: 'url("/images/sendIcon.svg")',
              WebkitMaskSize: '80%',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPositionY: 'center',
              maskImage: 'url("/images/sendIcon.svg")',
              maskSize: 'cover',
            }}
            value=""
          />
        </form>
      </div>
    </>
  );
}

export default function Provider() {
  const [conv, setConv] = useState<Conv>([]);

  return (
    <ConvContext.Provider value={{ conv, setConv }}>
      <Index />
    </ConvContext.Provider>
  );
}
