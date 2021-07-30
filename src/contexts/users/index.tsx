import React, { createContext, FC, useState } from "react";
import { useMemo } from "react";
import { IContext, IUser } from "./interfaces";
import Users from './users.json';

export const UsersContext = createContext<IContext>({
  users: [],
});

export const UsersProvider: FC = ({ children }) => {
  const [users, setUsers] = useState<IUser[]>(Users as IUser[]);

  const value = useMemo(
    () => ({
      users: users,
    }),
    [users]
  );

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
