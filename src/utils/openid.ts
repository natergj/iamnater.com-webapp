import jwt from "jsonwebtoken";

const config = {
  authorizationEndpoint: "https://auth.iamnater.com/oauth2/authorize",
  clientId: "4nr7o3oigccr3is8th21ts5h2c"
};

export function getRedirectUrl() {
  const redirectUri = `${window.location.origin}`;
  const state = Math.floor(Math.random() * 1_000_000).toString();
  window.localStorage.setItem("auth_state", state);

  const noonce = Math.floor(Math.random() * 1_000_000).toString();
  const queryParams = new URLSearchParams();
  queryParams.set("state", state);
  queryParams.set("noonce", noonce);
  queryParams.set("client_id", config.clientId);
  queryParams.set("redirect_uri", redirectUri);
  queryParams.set("response_type", "code");
  queryParams.set("scope", "openid email profile");
  queryParams.set("access_type", "offline");
  return `${config.authorizationEndpoint}?${queryParams.toString()}`;
}

export async function exchangeCode(code: string, state: string) {
  const authState = window.localStorage.getItem("auth_state");
  window.localStorage.removeItem("auth_state");
  if (authState !== state) {
    throw new Error("Invalid auth state");
  }

  const resp = await fetch(`/oauth/exchange-token`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  const tokens = await resp.json();
  setTokens(tokens);
}

const setTokens = (tokens: any) => {
  if (tokens.error) {
    return;
  }
  window.localStorage.setItem("access_token", tokens.access_token);
  window.localStorage.setItem("id_token", tokens.id_token);
  if (tokens.refresh_token) {
    window.localStorage.setItem("refresh_token", tokens.refresh_token);
  }

  const payload = jwt.decode(tokens.id_token);
  const now = Math.floor(Date.now() / 1000);
  setTimeout(() => refreshTokens(), (payload.exp - now - 120) * 1000);
}

export const refreshTokens = async () => {
  const refreshToken = window.localStorage.getItem("refresh_token");
  if (!refreshToken) {
    return;
  }
  const resp = await fetch(`/oauth/refresh-token`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      refresh_token: refreshToken,
    }),
  });
  const tokens = await resp.json();
  setTokens(tokens);
};
