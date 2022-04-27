import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../auth/AuthContext";

function Logout() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  function logoutHandler() {
    console.log("clicked");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    authCtx.removeCredentials();
    navigate("/");
  }

  return (
    <Button variant="danger" onClick={logoutHandler}>
      Logout
    </Button>
  );
}

export default Logout;