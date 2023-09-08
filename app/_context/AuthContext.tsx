"use client";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { FC, createContext, useContext, useEffect, useState } from "react";
import firebase_app from "../_firebase/config";
import { AuthContextValue } from "../_types/context/AuthContext";
import { useRouter } from "next/navigation";

const defaultAuthContextValue: AuthContextValue = {
  user: null,
  isUserLoading: false,
};

const AuthContext = createContext(defaultAuthContextValue);

type Props = {
  children: React.ReactNode;
};

const auth = getAuth(firebase_app);

const AuthContextProvider: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(defaultAuthContextValue.user);
  const [isUserLoading, setIsUserLoading] = useState(
    defaultAuthContextValue.isUserLoading
  );

  const setLocalStorageUser = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const getLocalStorageUser = () => {
    const userStringified = localStorage.getItem("user");
    return userStringified ? JSON.parse(userStringified) : null;
  };

  const removeLocalStorageUser = () => {
    localStorage.removeItem("user");
  };

  // listen for user changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase && !user) {
        setUser(userFirebase);
        setLocalStorageUser(userFirebase);
      }
      if (!userFirebase) {
        setUser(null);
        removeLocalStorageUser();
      }
      setIsUserLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  // protect all pages till user authenticates
  useEffect(() => {
    const localStorageUser = getLocalStorageUser();
    if (!user && !isUserLoading && !localStorageUser)
      router.push("/auth/signup");
  }, [router, user, isUserLoading]);

  return (
    <AuthContext.Provider value={{ user, isUserLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
