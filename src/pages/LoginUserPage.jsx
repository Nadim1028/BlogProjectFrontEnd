

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";

import AuthContext from "../auth/AuthContext";
import LoginUserForm from "../users/LoginUserForm";
import jwtDecode from "jwt-decode";

function LoginUserPage() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  function loginUserHandler(userData) {
    fetch("https://localhost:5001/api/authors/signin", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
        // navigate("/");
      })
      .then((data) => {
        //console.log(data);
        localStorage.setItem("userName", data.userName);
        localStorage.setItem("token", data.token);

        const user = jwt(data.token);

        console.log("Username from Login",user.UserName);
        console.log("UserId from Login",user.AuthorId);

        //console.log("un", localStorage.getItem("userName"));
        //console.log("tn", localStorage.getItem("token"));

        localStorage.setItem("userName", user.UserName);
        localStorage.setItem("userId", user.AuthorId);

        authCtx.addCredentials({
          userId: user.AuthorId,
          userName: data.userName,
          token: data.token,
        });

        navigate("/");

      });
  }

  return (
    <section>
      <h1>User Login</h1>
      <LoginUserForm onLoginUser={loginUserHandler} />
    </section>
  );
}

export default LoginUserPage;