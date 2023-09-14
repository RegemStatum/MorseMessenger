"use client";
import { FC, useContext, createContext, useState } from "react";

type UserContextValue = {
  chosenImageId: number;
  isUploadImageModalOpen: boolean;
  setChosenImage: (id: number) => void;
  openUploadImageModal: () => void;
  closeUploadImageModal: () => void;
};

const defaultUserContextValue: UserContextValue = {
  chosenImageId: 1,
  isUploadImageModalOpen: false,
  setChosenImage: (id) => {},
  openUploadImageModal: () => {},
  closeUploadImageModal: () => {},
};

const UserContext = createContext(defaultUserContextValue);

type Props = {
  children: React.ReactNode;
};

const UserContextProvider: FC<Props> = ({ children }) => {
  const [chosenImageId, setChosenImageId] = useState(
    defaultUserContextValue.chosenImageId
  );
  const [isUploadImageModalOpen, setIsUploadImageModalOpen] = useState(
    defaultUserContextValue.isUploadImageModalOpen
  );

  const setChosenImage = (id: number) => {
    setChosenImageId(id);
  };

  const openUploadImageModal = () => {
    setIsUploadImageModalOpen(true);
  };

  const closeUploadImageModal = () => {
    setIsUploadImageModalOpen(false);
  };

  return (
    <UserContext.Provider
      value={{
        chosenImageId,
        isUploadImageModalOpen,
        setChosenImage,
        openUploadImageModal,
        closeUploadImageModal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserContextProvider;
