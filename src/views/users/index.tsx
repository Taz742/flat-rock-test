import * as React from "react";
import { UsersProvider } from "../../contexts/users";
import SearchAppBar from "./AppBar";
import Table from "./Table";

export default function Users() {
  return (
    <UsersProvider>
      <SearchAppBar />
      <Table />
    </UsersProvider>
  );
}
