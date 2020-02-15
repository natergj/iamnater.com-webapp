import * as React from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const NavMenu: React.FunctionComponent<{}> = () => {
  const anchorEl = React.useRef(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const history = useHistory();
  const goTo = (route: string) => {
    setIsMenuOpen(false);
    history.push(route);
  };

  return (
    <React.Fragment>
      <IconButton
        edge="start"
        aria-label="navigation menu"
        aria-controls="navigation-menu"
        aria-haspopup="true"
        onClick={() => setIsMenuOpen(true)}
        ref={anchorEl}
      >
        <MenuIcon />
      </IconButton>
      <Menu id="navigation-menu" open={isMenuOpen} anchorEl={anchorEl.current} onClose={() => setIsMenuOpen(false)}>
        <MenuItem onClick={goTo.bind(null, "/")}>Home</MenuItem>
        <MenuItem onClick={goTo.bind(null, "/recipes")}>Recipes</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default NavMenu;
