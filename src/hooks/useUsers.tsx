import { useContext } from "react";

import { UsersContext } from "../contexts/users";

const useUsers = () => {
  const usersData = useContext(UsersContext);
  return usersData;
};

export default useUsers;
