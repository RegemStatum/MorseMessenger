"use client";

import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { FC, createContext, useContext, useEffect, useState } from "react";
import firebase_app from "../_firebase/config";
import { AuthContextValue } from "../_types/context/AuthContext";

const defaultAuthContextValue: AuthContextValue = {
  user: null,
  isUserLoading: true,
};

const AuthContext = createContext(defaultAuthContextValue);

type Props = {
  children: React.ReactNode;
};

const auth = getAuth(firebase_app);

const AuthContextProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(defaultAuthContextValue.user);
  const [isUserLoading, setIsUserLoading] = useState(
    defaultAuthContextValue.isUserLoading
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null);
      setIsUserLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isUserLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
