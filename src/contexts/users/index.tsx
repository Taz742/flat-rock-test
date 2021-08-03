import React, { createContext, FC, useState } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import { IContext, IPermission, IUser, Role } from "./interfaces";

let nextId = 0;

function createUser(
  name: string,
  surname: string,
  email: string,
  role: Role,
  isActive: boolean,
  disabled: boolean,
  superUser: boolean
): IUser {
  return {
    id: ++nextId,
    name,
    surname,
    email,
    role,
    isActive,
    disabled,
    superUser,
    permissions: [
      {
        name: "NAME_SURNAME",
        permissions: [
          {
            groupId: "NAME_SURNAME",
            label: "Name",
            enable: true,
          },
          {
            groupId: "NAME_SURNAME",
            label: "Surname",
            enable: true,
          },
        ],
      },
      {
        name: "EMAIL",
        permissions: [
          {
            groupId: "EMAIL",
            label: "Email",
            enable: true,
          },
        ],
      },
      {
        name: "ROLE",
        permissions: [
          {
            groupId: "ROLE",
            label: "Role",
            enable: true,
          },
        ],
      },
    ],
  };
}

const Users: IUser[] = [
  createUser(
    "Tazo",
    "Leladze",
    "taz742b@gmail.com",
    "ADMIN",
    true,
    false,
    true
  ),
  createUser(
    "Giorgi",
    "Leladze",
    "taz742b@gmail.com",
    "USER",
    true,
    false,
    false
  ),
  createUser(
    "Makho",
    "Leladze",
    "taz742b@gmail.com",
    "ADMIN",
    true,
    false,
    true
  ),
  createUser(
    "Akaki",
    "Leladze",
    "taz742b@gmail.com",
    "USER",
    true,
    false,
    false
  ),
  createUser(
    "Goga",
    "Leladze",
    "taz742b@gmail.com",
    "MODERATOR",
    true,
    true,
    false
  ),
  createUser(
    "Sandro",
    "Leladze",
    "taz742b@gmail.com",
    "USER",
    true,
    false,
    false
  ),
  createUser(
    "Nika",
    "Leladze",
    "taz742b@gmail.com",
    "MODERATOR",
    true,
    true,
    false
  ),
  createUser(
    "Noah",
    "Leladze",
    "taz742b@gmail.com",
    "ADMIN",
    true,
    false,
    false
  ),
];

export const UsersContext = createContext<IContext>({
  users: [],
  handleActiveStatusChange: (id, isActive) => {},
  handleAddOrUpdateUser: (user) => {},
  handleFilter: (str) => {},
  handleDelete: (id) => {},
  handleChangePermission: (user, permission, enable) => {},
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
            user.name.toLowerCase().includes(str.toLowerCase()) ||
            user.surname.toLowerCase().includes(str.toLowerCase()) ||
            user.email.toLowerCase().includes(str.toLowerCase()) ||
            user.role.toLowerCase().includes(str.toLowerCase())
        )
      );
    }
  }, []);

  const handleDelete = useCallback((id: number) => {
    setUsers((users) => users.filter((user) => user.id !== id));
  }, []);

  const handleChangePermission = useCallback(
    (user: IUser, permission: IPermission, enable: boolean) => {
      setUsers((users) =>
        users.map((_user) => {
          if (_user.id !== user.id) return user;

          const newPermissions = _user.permissions.map((permissionGroup) => {
            if (permissionGroup.name !== permission.groupId)
              return permissionGroup;

            const permissions = permissionGroup.permissions;

            const foundPermission = permissions.find(
              (_permission) => _permission.label === permission.label
            ) as Required<IPermission>;

            foundPermission.enable = enable;

            return { ...permissionGroup, permissions: permissions };
          });

          return {
            ...user,
            permissions: newPermissions
          };
        })
      );
    },
    []
  );

  const value = useMemo(
    () => ({
      users,
      handleActiveStatusChange,
      handleAddOrUpdateUser,
      handleFilter,
      handleDelete,
      handleChangePermission,
    }),
    [
      users,
      handleActiveStatusChange,
      handleAddOrUpdateUser,
      handleFilter,
      handleDelete,
      handleChangePermission,
    ]
  );

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
