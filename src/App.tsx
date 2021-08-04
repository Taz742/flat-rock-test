import * as React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Users from "./views/users/";
import UserDetails from "./views/user-details";
import { UsersProvider } from "./contexts/users";

export default function App() {
  return (
    <UsersProvider>
      <Router>
        <Route exact path="/users/" component={Users} />
        <Route exact path="/users/:id" component={UserDetails} />
        <Route exact path="*" component={() => <Redirect to="/users" />} />
      </Router>
    </UsersProvider>
  );
}
