import * as React from "react";
import { UsersProvider } from "../../contexts/users";
import AppBar from "../../components/app-bar/AppBar";
import Table from "./Table";

export default function Users() {
  return (
    <>
      <AppBar />
      <Table />
    </>
  );
}
