import * as React from "react";
import { Button } from "@material-ui/core";
import { UserContext } from "../contexts/User";

const LoginButton = () => {
  const { login } = React.useContext(UserContext);
  return (
    <Button aria-controls="login-options" aria-haspopup="true" onClick={login}>
      Login
    </Button>
  );
};

export default LoginButton;
