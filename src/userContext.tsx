import React, { createContext, useContext, useState } from 'react';
import { APIUser } from './types';

const userContext = createContext<{
  user: APIUser | null;
  setUser: React.Dispatch<React.SetStateAction<APIUser | null>>;
}>({
  user: null,
  setUser: () => {
    return;
  },
});

export const useUser = () => useContext(userContext);

export function UserProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<APIUser | null>(null);
  return <userContext.Provider value={{ user, setUser }}>{children}</userContext.Provider>;
}
