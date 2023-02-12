import { APIUser } from '@/types';
import React from 'react';

export function VerifyEmail({ name, email, code }: { name: string; email: string; code: string }) {
  return (
    <div>
      <div className="text-xl">
        Hi {name}, verify your email adress ({email}):
      </div>
      here is your code : <span className="font-mono">{code}</span>
    </div>
  );
}
