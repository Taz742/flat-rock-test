import * as React from "react";
import { UsersProvider } from "../../contexts/users";
import AppBar from "../../components/app-bar/AppBar";
import Details from './details';

export default function UserDetails() {
  return (
    <UsersProvider>
      <AppBar />
      <Details />
    </UsersProvider>
  );
}
