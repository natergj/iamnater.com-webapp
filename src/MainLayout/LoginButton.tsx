import * as React from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { UserContext } from "../contexts/User";

const LoginButton = () => {
  const anchorEl = React.useRef(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { login } = React.useContext(UserContext);

  const loginHandler = () => {
    setIsMenuOpen(false);
    login();
  }

  return (
    <React.Fragment>
      <Button aria-controls="login-options" aria-haspopup="true" onClick={() => setIsMenuOpen(true)} ref={anchorEl}>
        Login
      </Button>
      <Menu id="login-options" open={isMenuOpen} anchorEl={anchorEl.current}>
        <MenuItem>
          <Button onClick={loginHandler}>Login with google</Button>
        </MenuItem>
        {/* <MenuItem onClick={loginWithService.bind(null, "microsoft")}>Login with Microsoft</MenuItem> */}
      </Menu>
    </React.Fragment>
  );
};

export default LoginButton;
