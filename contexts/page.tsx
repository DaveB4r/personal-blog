"use client";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";
import Cookies from "js-cookie";
import { userLogged } from "./../interfaces/UserInterface";
import { SessionProvider } from "next-auth/react";

type AuthTokens = {
  token: string;
  refresh_token: string;
};

// Context
let userDefault: userLogged = {
  id: "",
  avatar: "",
  email: "",
  isLogged: false,
  username: "",
  favorites: [],
};

export const AuthContext = createContext({
  login: (authTokens: AuthTokens) => {},
  setFavorites: (favorites: string[]) => {},
  logout: () => {},
  user: () => userDefault,
});

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const login = useCallback((authTokens: AuthTokens) => {
    Cookies.set("authTokens", JSON.stringify(authTokens));
  }, []);
  const setFavorites = useCallback((favorites: string[]) => {
    const cookies = Cookies.get("authTokens")
      ? JSON.parse(Cookies.get("authTokens"))
      : userDefault;
    cookies.favorites = favorites;
    Cookies.set("authTokens", JSON.stringify(cookies));
  }, []);
  const logout = useCallback(() => {
    Cookies.remove("authTokens");
  }, []);
  const user = useCallback(() => {
    return Cookies.get("authTokens")
      ? JSON.parse(Cookies.get("authTokens"))
      : userDefault;
  }, []);
  // Context value
  const value = useMemo(
    () => ({ login, setFavorites, logout, user }),
    [login, setFavorites, logout, user]
  );

  return (
    <SessionProvider>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </SessionProvider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
