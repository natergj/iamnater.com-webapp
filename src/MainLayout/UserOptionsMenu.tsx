import * as React from "react";
import { UserContext } from "../contexts/User";
import { Button, Menu, MenuItem } from "@material-ui/core";



const UserOptionsMenu = () => {
  const anchorEl = React.useRef(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { currentUser, logout } = React.useContext(UserContext);

  const logoutHandler = () => {
    setIsMenuOpen(false);
    logout();
  }

  return (
    <React.Fragment>
      <Button aria-controls="current-user-menu" aria-haspopup="true" onClick={() => setIsMenuOpen(true)} ref={anchorEl}>
        {currentUser && currentUser.name ? currentUser.name : ""}
      </Button>
      <Menu id="current-user-menu" open={isMenuOpen} anchorEl={anchorEl.current} onClose={() => setIsMenuOpen(false)}>
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default UserOptionsMenu;
