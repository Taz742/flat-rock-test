import { useMemo } from "react";
import { IPermission, IUser } from "../contexts/users/interfaces";

const useUserPermissions = (user: IUser | null | undefined) => {
  const value = useMemo(() => {
    if (!user) return {
      nameAndSurnamePermissions: [],
      emailPermissions: [],
      rolePermissions: []
    };

    const permissions = user.permissions;

    const nameAndSurnamePermissions = permissions.find(
      (permission) => permission.name === "NAME_SURNAME"
    )?.permissions as Required<IPermission[]>;
  
    const emailPermissions = permissions.find(
      (permission) => permission.name === "EMAIL"
    )?.permissions as Required<IPermission[]>;
  
    const rolePermissions = permissions.find(
      (permission) => permission.name === "ROLE"
    )?.permissions as Required<IPermission[]>;
  
    return {
      nameAndSurnamePermissions,
      emailPermissions,
      rolePermissions,
    };
  }, [user]);

  return value;
};

export default useUserPermissions;
