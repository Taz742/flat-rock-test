export type Role = "ADMIN" | "USER" | "MODERATOR";
export type PermissionGroupName = "NAME_SURNAME" | "EMAIL" | "ROLE";

export interface IPermission {
  groupId: PermissionGroupName;
  label: string;
  enable: boolean;
}

export interface IPermissionGroup {
  name: PermissionGroupName;
  permissions: IPermission[];
}

export interface IUser {
  id?: number;
  name: string;
  surname: string;
  email: string;
  role: Role;
  isActive: boolean;
  disabled?: boolean;
  superUser: boolean;
  permissions: IPermissionGroup[];
}

export interface IContext {
  users: IUser[];
  activeUser: IUser;
  handleActiveStatusChange: (id: number, isActive: boolean) => void;
  handleAddOrUpdateUser: (user: IUser) => void;
  handleFilter: (str: string) => void;
  handleDelete: (id: number) => void;
  handleChangePermission: (user: IUser, permission: IPermission, enable: boolean) => void;
  handleChangeActiveUser: (id: number) => void;
}
