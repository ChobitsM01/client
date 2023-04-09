import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Role from "../components/Role/Role";
import User from "../components/User/User";
import { Switch, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import GroupRole from "../components/GroupRole/GroupRole";
import HomePage from "../components/HomePage/HomePage";

const Project = () => {
  return (
    <span>Project</span>
  )
}

const AppRoutes = () => {
  return (
    <>
      <Switch>

        <PrivateRoutes path='/users' component={ User } />
        <PrivateRoutes path="/projects" component={ Project } />
        <PrivateRoutes path="/role" component={ Role } />
        <PrivateRoutes path="/group-role" component={ GroupRole } />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>

        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="*">
          404 not found
        </Route>
      </Switch>
    </>
  );
};

export default AppRoutes;