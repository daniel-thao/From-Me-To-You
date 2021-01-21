import React, { useState, useEffect, useContext } from "react";
import {useHistory} from "react-router-dom"

// test imports, we have to deconstruct it
// import { registerUser } from "../routes/authentication/userAuth";

// Import module CSS
import CSS from "./login-register.module.css";
import gStyle from "../../general.module.css";

// import the Auth context
import { AuthContext } from "../../routes/auth";
import HasAccountContext from "../../utils/HasAccountContext";

export default function Register() {
  // deconstruct the things I need from the Auth context
  const { user, registerUser, errors } = useContext(AuthContext);
  const { isRegistered, setIsRegistered } = useContext(HasAccountContext);

  // Set our object state
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "", confirmPwd: "" });

  const history = useHistory();
  useEffect(() => {
    if (user) {
        history.push("/frommetoyou");
    }
  }, [user, history]);

  return (
    <div className={`${CSS.flex} ${CSS.centeringForm}`}>
      Register Here
      <form
        className={`${CSS.registerForm}`}
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          registerUser(newUser);
          setIsRegistered(true);
        }}
      >
        <div className={`${CSS.flex} ${CSS.marginS}`}>
          <input
            className={CSS.inputs}
            onChange={(event) => setNewUser({ ...newUser, username: event.target.value })}
            value={newUser.name}
            error={errors.name}
            id="name"
            type="text"
            // className={classnames("", {
            //   invalid: errors.name,
            // })}
          />
          <label className={CSS.labels} htmlFor="name">
            Name
          </label>
          <p className="errorText">{errors.name}</p>
        </div>

        <div className={`${CSS.flex} ${CSS.marginS}`}>
          <input
            className={CSS.inputs}
            onChange={(event) => setNewUser({ ...newUser, email: event.target.value })}
            value={newUser.email}
            error={errors.email}
            id="email"
            type="email"
            // className={classnames("", {
            //   invalid: errors.email,
            // })}
          />
          <label className={CSS.labels} htmlFor="email">
            Email
          </label>
          <p className="errorText">{errors.email}</p>
        </div>

        <div className={`${CSS.flex} ${CSS.marginS}`}>
          <input
            className={CSS.inputs}
            onChange={(event) => setNewUser({ ...newUser, password: event.target.value })}
            value={newUser.password}
            error={errors.password}
            id="password"
            type="password"
            // className={classnames("", {
            //   invalid: errors.password,
            // })}
          />
          <label className={CSS.labels} htmlFor="password">
            Password
          </label>
          <p className="errorText">{errors.password}</p>
        </div>
        <div className={`${CSS.flex} ${CSS.marginS}`}>
          {/* THE CLASS FOR THE DIVS className="input-field col s12" */}
          <input
            className={CSS.inputs}
            onChange={(event) => setNewUser({ ...newUser, confirmPwd: event.target.value })}
            value={newUser.confirmPwd}
            error={errors.confirmPwd}
            id="confirmPwd"
            type="password"
            // className={classnames("", {
            //   invalid: errors.password2,
            // })}
          />
          <label className={CSS.labels} htmlFor="confirmPwd">
            Confirm Password
          </label>
          <p className="errorText">{errors.confirmPwd}</p>
        </div>

        <div className={`${CSS.flex} ${CSS.marginM}`}>
          <button className={`${CSS.buttons}`} type="submit">
            Sign up
          </button>
        </div>
      </form>
      <div>
        <button
          type="click"
          className={`${CSS.buttons}`}
          onClick={() => {
            setIsRegistered(true);
          }}
        >
          Already Have Account
        </button>
      </div>
      <div>{errors.exists}</div>
    </div>
  );
}
