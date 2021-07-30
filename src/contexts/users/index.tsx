import React, { createContext, FC, useState } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import { IContext, IUser } from "./interfaces";
import Users from "./users.json";

let nextId = Users.length + 1;

export const UsersContext = createContext<IContext>({
  users: [],
  handleActiveStatusChange: (id, isActive) => {},
  handleAddOrUpdateUser: (user) => {},
  handleFilter: (str) => {},
  handleDelete: (id) => {}
});

export const UsersProvider: FC = ({ children }) => {
  const [users, setUsers] = useState<IUser[]>(Users as IUser[]);

  const handleActiveStatusChange = useCallback(
    (id: number, isActive: boolean) => {
      setUsers((users) =>
        users.map((user) =>
          user.id === id
            ? {
                ...user,
                isActive,
              }
            : user
        )
      );
    },
    []
  );

  const handleAddOrUpdateUser = useCallback((user: IUser) => {
    if (user.id) {
      // update user
      setUsers((users) =>
        users.map((_user) =>
          user.id === _user.id
            ? {
                ..._user,
                ...user,
                isActive: true,
                disabled: false,
              }
            : _user
        )
      );
    } else {
      setUsers((users) => [
        { ...user, isActive: true, disabled: false, id: ++nextId },
        ...users,
      ]);
    }
  }, []);

  const handleFilter = useCallback((str: string) => {
    if (str === "") {
      setUsers(Users as IUser[]);
    } else {
      setUsers((users) =>
        users.filter(
          (user) =>
            user.name.includes(str) ||
            user.surname.includes(str) ||
            user.email.includes(str) ||
            user.role.includes(str)
        )
      );
    }
  }, []);

  const handleDelete = useCallback((id: number) => {
    setUsers((users) => users.filter(user => user.id !== id))
  }, [])

  const value = useMemo(
    () => ({
      users,
      handleActiveStatusChange,
      handleAddOrUpdateUser,
      handleFilter,
      handleDelete
    }),
    [users, handleActiveStatusChange, handleAddOrUpdateUser, handleFilter, handleDelete]
  );

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
