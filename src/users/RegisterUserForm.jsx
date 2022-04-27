import { useRef } from "react";
import Card from "../ui/Card";
import classes from "./UserForm.module.css";

function RegisterUserForm(props) {
  const emailInputRef = useRef();
  const userNameInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredUserName = userNameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      console.log("Passwords did not match");
      return;
    }

    const userData = {
      UserName: enteredUserName,
      Email: enteredEmail,
      Password: enteredPassword,
      // Roles: ["General"],
    };

    console.log(userData);
    props.onRegisterUser(userData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        
        <div className={classes.control}>
          <label htmlFor="userName">Username</label>
          <input type="text" required id="userName" ref={userNameInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="fullName">Email</label>
          <input type="text" required id="email" ref={emailInputRef} />
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
        <div className={classes.control}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            required
            id="confirmPassword"
            ref={confirmPasswordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>Register</button>
        </div>
      </form>
    </Card>
  );
}

export default RegisterUserForm;