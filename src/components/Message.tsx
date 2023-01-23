import React from 'react';

export default function Message({ content, extern }: { content: string; extern: boolean }) {
  return <div className={`${extern ? 'text-left' : 'text-right'}`}>{content}</div>;
}
