import { createContext } from "react";
import { useState } from "react";

const AuthContext = createContext({
  userId: "",
  userName: "",
  token: "",
});

export function AuthContextProvider(props) {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState("");

  function addCredentialsHandler(userDetails) {
    setUserId(userDetails.userId);
    setUserName(userDetails.userName);
    setToken(userDetails.token);
  }

  function removeCredentialsHandler() {
    setUserId("");
    setUserName("");
    setToken("");
  }

  const context = {
    userId: userId,
    userName: userName,
    token: token,
    addCredentials: addCredentialsHandler,
    removeCredentials: removeCredentialsHandler,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;