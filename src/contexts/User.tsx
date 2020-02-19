import * as React from "react";
import jwt from "jsonwebtoken";
import { gql, useLazyQuery } from "@apollo/client";
import { getRedirectUrl, refreshTokens } from "../utils/openid";

const userQuery = gql`
  query UserOptionsQuery {
    user {
      id
      name
      email
      roles
    }
  }
`;

export const UserContext = React.createContext<any>({ currentUser: null, setCurrentUser: () => null });

export const UserProvider: React.FunctionComponent<{}> = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isAuthenticating, setIsAuthenticating] = React.useState(!!window.localStorage.getItem("auth_state"));
  const refreshTimeoutId = React.useRef(null);

  const [getUser, lazyQueryResult] = useLazyQuery(userQuery, { fetchPolicy: "no-cache" });

  const logout = () => {
    Object.keys(window.localStorage).forEach(key => {
      if (window.localStorage.hasOwnProperty(key) && key.endsWith("token")) {
        window.localStorage.removeItem(key);
      }
    });
    setCurrentUser(null);
  };

  const login = () => {
    setIsAuthenticating(true);
    const redirectUri = getRedirectUrl();
    window.location.assign(redirectUri);
  };

  React.useEffect(() => {
    if (lazyQueryResult.data && lazyQueryResult.data.user) {
      setCurrentUser({
        ...currentUser,
        ...lazyQueryResult.data.user,
      });
    }
  }, [lazyQueryResult]);

  React.useEffect(() => {
    if (currentUser) {
      setIsAuthenticating(false);
    }
  }, [currentUser]);

  React.useEffect(() => {
    (async () => {
      const refreshToken = window.localStorage.getItem("refresh_token");
      const idToken = window.localStorage.getItem("id_token");
      if (refreshToken && idToken) {
        setIsAuthenticating(true);
        const payload = jwt.decode(idToken);
        const now = Math.floor(Date.now() / 1000);
        if (now > payload.exp - 120) {
          refreshTokens();
        } else {
          getUser();
        }
      }
    })();
    return () => {
      clearTimeout(refreshTimeoutId.current);
      logout();
    };
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, isAuthenticating, login, logout, getUser }}>
      {children}
    </UserContext.Provider>
  );
};
