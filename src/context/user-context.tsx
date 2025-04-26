"use client";

import { getUsers, loginUser, logoutUser } from "@/service/user";
import { User } from "@/types/user";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextProps {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  logoutUser: () => void;
  loginUser: (email: string, password: string) => void;
  fetchUserProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [hasSession, setHasSession] = useState<boolean>(false);

  useEffect(() => {
    // Al cargar el contexto, intenta cargar el usuario de sessionStorage
    const token = sessionStorage.getItem("token");
    const userData = sessionStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
      setToken(token);
      setHasSession(true);
    } else {
      setHasSession(false);
      setToken(null);
      setUser(null);
    }
  }, []);

  const handlerLogin = async (email: string, password: string) => {
    try {
      const response = await loginUser(email, password);
      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("user", JSON.stringify(response.user));
      setHasSession(true);
      setToken(response.token);
      setUser(response.user);
    } catch (error) {
      console.error("Error during login:", error);
      setHasSession(false);
      setUser(null);
      setToken(null);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userData");
      throw error;
    }
  };

  const fetchUserProfile = async () => {
    try {
      const userData = await getUsers();
      setUser(userData);
      sessionStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.warn("Error fetching user profile:", error);
      sessionStorage.removeItem("userData");
      setUser(null);
    }
  };

  const handleLogout = async () => {
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("token");
    setUser(null);
    setHasSession(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        isAuthenticated: hasSession === true && !!user,
        loginUser: handlerLogin,
        logoutUser: handleLogout,
        fetchUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

/* eslint-disable react-refresh/only-export-components */
export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
};
