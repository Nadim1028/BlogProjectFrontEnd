import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../auth/AuthContext";
import Logout from "../auth/Logout";

import classes from "./MainNavigation.module.css";

function MainNavigation() 
{
  const authCtx = useContext(AuthContext);

  const loggedIn = authCtx.userName !== "" && authCtx.token !== "";

  let content;

  if (loggedIn) {
    content = (
      <ul>
        <li>
          <Link to="/">Blog Stories</Link>
        </li>
        <li>
          <Link to="/new-story">Create Story</Link>
        </li>
      </ul>
    );
  }

  if (!loggedIn) {
    content = (
      <ul>
        <li>
          <Link to="/">Blog Stories</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    );
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>News Stories</div>
      <nav>{content}</nav>
      {loggedIn ? <Logout /> : <p></p>}
    </header>
  );
}

export default MainNavigation;