import { useRef } from "react";

import Card from "../ui/Card";
import classes from "./UserForm.module.css";

function LoginUserForm(props) {
  const userNameInputRef = useRef();
  const passwordInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredUserName = userNameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const userData = {
      UserName: enteredUserName,
      Password: enteredPassword,
    };

    console.log(userData);
    props.onLoginUser(userData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="userName">Username</label>
          <input type="text" required id="userName" ref={userNameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            id="password"
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>Login</button>
        </div>
      </form>
    </Card>
  );
}

export default LoginUserForm;