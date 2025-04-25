'use client'

import { getUsers, loginUser, logoutUser } from "@/service/user";
import { User } from "@/types/user";
import { createContext, useContext, useEffect, useState } from 'react'

interface UserContextProps {
  user: User | null;
  isAuthenticated: boolean;
  logoutUser: () => void;
  loginUser: (email: string, password: string) => void;
  fetchUserProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setHasSession(true);
    } else {
      setUser(null);
      setHasSession(false);
    }
  }
  , []);

  const handlerLogin = async (email: string, password: string) => {
    try {
        await loginUser(email, password);
        await fetchUserProfile();
        setHasSession(true);
    } catch (error) {
        console.error("Error during login:", error);
        setHasSession(false);
        localStorage.removeItem("userData"); // Eliminar usuario de localStorage
        throw error;
    }
    };

  const fetchUserProfile = async () => {
    try {
      const userData = await getUsers();
      setUser(userData);
      localStorage.setItem("userData", JSON.stringify(userData)); // Guardar en localStorage
    } catch (error) {
      console.warn("Error fetching user profile:", error);
      localStorage.removeItem("userData");
      setUser(null);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("userData"); // Eliminar usuario de localStorage
    setUser(null);
    setHasSession(false);
  };


  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: hasSession === true && !!user,
        loginUser: handlerLogin,
        logoutUser: handleLogout,
        fetchUserProfile
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
