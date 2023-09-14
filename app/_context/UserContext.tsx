"use client";
import {
  FC,
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { USER_DEFAULT_IMAGES } from "../_lib/constants/constants";
import { useAuthContext } from "./AuthContext";
import { firebase_storage } from "../_firebase/config";
import { getDownloadURL, listAll, ref } from "firebase/storage";

type ChosenImage = {
  id: number | string;
  url: string;
};

type AvatarImage = { id: number | string; name: string; src: string };

type UserContextValue = {
  chosenImage: ChosenImage;
  isUploadImageModalOpen: boolean;
  userUploadedAvatars: AvatarImage[];
  setChosenImage: (image: ChosenImage) => void;
  openUploadImageModal: () => void;
  closeUploadImageModal: () => void;
  updateUserUploadedAvatarImages: () => Promise<void>;
};

const defaultUserContextValue: UserContextValue = {
  chosenImage: {
    id: 1,
    url: USER_DEFAULT_IMAGES.find((image) => image.id === 1)?.src || "",
  },
  isUploadImageModalOpen: false,
  userUploadedAvatars: [],
  setChosenImage: (image) => {},
  openUploadImageModal: () => {},
  closeUploadImageModal: () => {},
  updateUserUploadedAvatarImages: async () => {},
};

const UserContext = createContext(defaultUserContextValue);

type Props = {
  children: React.ReactNode;
};

const UserContextProvider: FC<Props> = ({ children }) => {
  const { user } = useAuthContext();
  const [chosenImage, setChosenImage] = useState({
    ...defaultUserContextValue.chosenImage,
  });
  const [isUploadImageModalOpen, setIsUploadImageModalOpen] = useState(
    defaultUserContextValue.isUploadImageModalOpen
  );
  const [userUploadedAvatars, setUserUploadedAvatars] = useState<AvatarImage[]>(
    []
  );

  const getUserUploadedAvatarImagesList = useCallback(async () => {
    const userId = user?.uid;
    const userUploadedAvatarImagesRef = ref(
      firebase_storage,
      `/userImages/${userId}/avatarImages`
    );
    const uploadedAvatarImagesList = await listAll(userUploadedAvatarImagesRef);
    console.log("Uploaded photos", uploadedAvatarImagesList);
    return uploadedAvatarImagesList;
  }, [user?.uid]);

  const getUserUploadedAvatarImagesURL = useCallback(async () => {
    const userUploadedAvatarImagesList =
      await getUserUploadedAvatarImagesList();
    const userUploadedAvatarImages = userUploadedAvatarImagesList.items;
    const imagesFullPath = userUploadedAvatarImages.map(
      (imageObj) => imageObj.fullPath
    );
    const imagesURLPromises = imagesFullPath.map(async (path) => {
      const imageStorageRef = ref(firebase_storage, path);
      const imageURL = await getDownloadURL(imageStorageRef);
      return imageURL;
    });
    const imagesURL = Promise.all(imagesURLPromises);
    return imagesURL;
  }, [getUserUploadedAvatarImagesList]);

  const updateUserUploadedAvatarImages = useCallback(async () => {
    const imagesURL = await getUserUploadedAvatarImagesURL();
    const newUserUploadedAvatars = imagesURL.map((imageURL) => {
      const id = imageURL.split("avatarImages%2F")[1];
      const name = id.split("?alt=media")[0].split("date%")[0];
      return {
        id,
        name,
        src: imageURL,
      };
    });
    setUserUploadedAvatars(newUserUploadedAvatars);
  }, [getUserUploadedAvatarImagesURL]);

  const openUploadImageModal = () => {
    setIsUploadImageModalOpen(true);
  };

  const closeUploadImageModal = () => {
    setIsUploadImageModalOpen(false);
  };

  useEffect(() => {
    updateUserUploadedAvatarImages();
  }, [updateUserUploadedAvatarImages]);

  return (
    <UserContext.Provider
      value={{
        chosenImage,
        isUploadImageModalOpen,
        userUploadedAvatars,
        setChosenImage,
        openUploadImageModal,
        closeUploadImageModal,
        updateUserUploadedAvatarImages,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserContextProvider;
