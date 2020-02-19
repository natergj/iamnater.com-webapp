import * as React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { exchangeCode } from "../utils/openid";
import { UserContext } from "../contexts/User";

const Auth: React.FunctionComponent = () => {
  const { getUser } = React.useContext(UserContext);
  const { search, pathname } = useLocation();
  const history = useHistory();
  const params: any = {};
  // @ts-ignore
  for (const [key, value] of new URLSearchParams(search).entries()) {
    params[key] = value;
  }

  React.useEffect(() => {
    if (params.code) {
      (async () => {
        history.push(pathname);
        await exchangeCode(params.code, params.state);
        getUser();
      })();
    }
  }, [params]);

  return null;
};

export default Auth;
