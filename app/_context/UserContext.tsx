"use client";
import { FC, useContext, createContext } from "react";

type UserContextValue = {};

const defaultUserContextValue: UserContextValue = {};

const UserContext = createContext(defaultUserContextValue);

type Props = {
  children: React.ReactNode;
};

const UserContextProvider: FC<Props> = ({ children }) => {
  const changePassword = () => {
    
  }

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);

export default UserContextProvider;
