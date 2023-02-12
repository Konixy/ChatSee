import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { APIUser } from './types';

const userContext = createContext<{
  user: APIUser | null;
  setUser: React.Dispatch<React.SetStateAction<APIUser | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  user: null,
  setUser: () => {
    return;
  },
  loading: false,
  setLoading: () => {
    return;
  },
});

export const useUser = () => useContext(userContext);

export function UserProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<APIUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get<{ success: boolean; user: APIUser }>('/api/user').then((r) => {
      setLoading(false);
      if (r.data.success) {
        setUser(r.data.user);
      }
    });
  }, []);
  return <userContext.Provider value={{ user, setUser, loading, setLoading }}>{children}</userContext.Provider>;
}
