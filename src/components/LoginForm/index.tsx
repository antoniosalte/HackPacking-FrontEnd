import "./scss/index.scss";

import * as React from "react";

import { useSignIn } from "@sdk/react";
import { maybe } from "@utils/misc";

import { Button, Form, TextField } from "..";

interface ILoginForm {
  hide?: () => void;
}

const LoginForm: React.FC<ILoginForm> = ({ hide }) => {
  const [signIn, { loading, error }] = useSignIn();

  const handleOnSubmit = async (evt, { email, password }) => {
    evt.preventDefault();
    const authenticated = await signIn({ email, password });
    if (authenticated && hide) {
      hide();
    }
  };

  return (
    <div className="login-form">
      <Form
        errors={maybe(() => error.extraInfo.userInputErrors, [])}
        onSubmit={handleOnSubmit}
      >
        <TextField
          name="email"
          autoComplete="email"
          type="email"
          required
          placeholder="email or username"
        />
        <TextField
          name="password"
          autoComplete="password"
          type="password"
          required
          placeholder="password"
        />
        <div className="btn-login">
          <button type="submit" {...(loading && { disabled: true })}>
            {loading ? "Loading" : "Sign in"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
