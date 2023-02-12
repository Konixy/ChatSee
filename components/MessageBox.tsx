import { useConv } from 'pages/chat';
import { APIUser, Conv } from 'lib/types';
import React, { useEffect } from 'react';
import Message from './Message';

export default function MessageBox({ user }: { user: APIUser }) {
  const { conv } = useConv();

  useEffect(() => {
    console.log(conv);
  }, [conv]);

  return (
    <div className="mx-10 my-10 h-full w-40 rounded-3xl px-6 py-6 clay-md-violet sm:w-96">
      <div className="h-full max-h-[50vh] min-h-[50vh] w-full overflow-y-auto px-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-violet-500 scrollbar-thumb-rounded-full">
        {conv.length < 1 && (
          <div className="text-center text-violet-200">
            It seems that you didn't started the conversation yet.
            <br />
            Why not right now ?
          </div>
        )}
        {conv.map((e) => (
          <Message
            key={e.id}
            extern={e.sender._id === user._id}
            content={e.content}
            loading={e.loading}
            sender={user}
          />
        ))}
      </div>
    </div>
  );
}
