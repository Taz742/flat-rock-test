export type Role = "ADMIN" | "USER" | "MODERATOR";

export interface IUser {
  id?: number;
  name: string;
  surname: string;
  email: string;
  role: Role;
  isActive: boolean;
  disabled?: boolean;
}

export interface IContext {
  users: IUser[];
  handleActiveStatusChange: (id: number, isActive: boolean) => void;
  handleAddOrUpdateUser: (user: IUser) => void;
  handleFilter: (str: string) => void;
  handleDelete: (id: number) => void;
}
