import * as React from "react";
import jwt from "jsonwebtoken";
import { gql, useLazyQuery } from "@apollo/client";

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
  const authClient = React.useRef<any>(null);
  const refreshTimeoutId = React.useRef(null);

  const [
    getUser,
    lazyQueryResult,
  ] = useLazyQuery(userQuery, { fetchPolicy: "no-cache" });

  const logout = () => {
    window.sessionStorage.removeItem("id_token");
    authClient.current.signOut();
  };

  const login = () => {
    authClient.current.signIn();
  };

  const refreshToken = async () => {
    if (refreshTimeoutId.current) {
      clearTimeout(refreshTimeoutId.current);
    }
    const auth2 = (window as any).gapi.auth2.getAuthInstance();
    if (auth2) {
      auth2.currentUser
        .get()
        .reloadAuthResponse()
        .then(({ id_token }) => {
          if (id_token) {
            const { exp } = jwt.decode(id_token);
            const refreshTimeout = (exp - 60) * 1000;
            setTimeout(refreshToken, refreshTimeout);
            window.sessionStorage.setItem("id_token", id_token);
          }
        });
    }
  };

  const handleAuthChange = () => {
    const user = (window as any).gapi.auth2.getAuthInstance().currentUser.get();
    const idToken = user.getAuthResponse().id_token;
    window.sessionStorage.setItem("id_token", idToken);

    if (idToken) {
      getUser();
      const { exp } = jwt.decode(idToken);
      const refreshTimeout = (exp - 60) * 1000;
      refreshTimeoutId.current = setTimeout(refreshToken, refreshTimeout);
      setCurrentUser({ isAuthenticated: true });
    } else {
      setCurrentUser({ isAuthenticated: false });
      window.sessionStorage.removeItem("id_token");
    }
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
    (window as any).gapi.load("client:auth2", () => {
      (window as any).gapi.client
        .init({
          clientId: "154778986327-p0fjcif4vbrmgmte24fehjutipgo2b9o.apps.googleusercontent.com",
          scope: "profile email", // and whatever else passed as a string...
        })
        .then(() => {
          authClient.current = (window as any).gapi.auth2.getAuthInstance();
          handleAuthChange();
          authClient.current.isSignedIn.listen(handleAuthChange);
        });
    });

    return () => {
      clearTimeout(refreshTimeoutId.current);
      window.sessionStorage.removeItem("id_token");
    };
  }, []);

  return <UserContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>{children}</UserContext.Provider>;
};
