export type Role = "ADMIN" | "USER" | "MODERATOR";

export interface IUser {
  name: string;
  surname: string;
  email: string;
  role: Role;
  isActive: boolean;
  disabled?: boolean;
}

export interface IContext {
  users: IUser[];
}
