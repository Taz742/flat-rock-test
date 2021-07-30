import { IUser } from "../../contexts/users/interfaces";

type SortableColumns = Pick<IUser, "name" | "role" | "isActive">;
export type SortKeys = keyof SortableColumns;

export type Order = "asc" | "desc";
