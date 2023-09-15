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
import { deleteObject, getDownloadURL, listAll, ref } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { useAppContext } from "./AppContext";

type ChosenImage = {
  id: number | string;
  url: string;
};

type AvatarImage = { id: number | string; name: string; src: string };

type UserContextValue = {
  chosenImage: ChosenImage;
  isUploadImageModalOpen: boolean;
  userUploadedAvatars: AvatarImage[];
  isUserImageUpdating: boolean;
  setChosenImage: (image: ChosenImage) => void;
  openUploadImageModal: () => void;
  closeUploadImageModal: () => void;
  updateUserUploadedAvatarImages: () => Promise<void>;
  deleteUserAvatarImage: (id: string, src: string) => Promise<void>;
  startUpdatingUserImage: () => void;
  endUpdatingUserImage: () => void;
};

const defaultUserContextValue: UserContextValue = {
  chosenImage: {
    id: 1,
    url: USER_DEFAULT_IMAGES.find((image) => image.id === 1)?.src || "",
  },
  isUploadImageModalOpen: false,
  userUploadedAvatars: [],
  isUserImageUpdating: false,
  setChosenImage: (image) => {},
  openUploadImageModal: () => {},
  closeUploadImageModal: () => {},
  updateUserUploadedAvatarImages: async () => {},
  deleteUserAvatarImage: async (id, src) => {},
  startUpdatingUserImage: () => {},
  endUpdatingUserImage: () => {},
};

const UserContext = createContext(defaultUserContextValue);

type Props = {
  children: React.ReactNode;
};

const UserContextProvider: FC<Props> = ({ children }) => {
  const { showInfoPopup } = useAppContext();
  const { user, updateLocalUser } = useAuthContext();
  const [chosenImage, setChosenImage] = useState({
    ...defaultUserContextValue.chosenImage,
  });
  const [isUploadImageModalOpen, setIsUploadImageModalOpen] = useState(
    defaultUserContextValue.isUploadImageModalOpen
  );
  const [userUploadedAvatars, setUserUploadedAvatars] = useState<AvatarImage[]>(
    []
  );
  const [isUserImageUpdating, setIsUserImageUpdating] = useState(false);

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

  const deleteUserAvatarImage = async (id: string, src: string) => {
    try {
      startUpdatingUserImage();

      const userId = user?.uid;
      const URLImageName = id.split("?alt=")[0];
      const imageName = URLImageName.replace("%3D", "=");
      const storageImageRef = ref(
        firebase_storage,
        `userImages/${userId}/avatarImages/${imageName}`
      );
      await deleteObject(storageImageRef);

      // set user photo URL to empty string if image to delete is user avatar image
      if (src === user?.photoURL) {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) throw new Error("No current user");
        await updateProfile(auth.currentUser, { photoURL: "" });
        updateLocalUser();
      }

      updateUserUploadedAvatarImages();
      showInfoPopup("Image has been deleted", "success");
      endUpdatingUserImage();
    } catch (error: any) {
      console.error(error);
      showInfoPopup(
        error.message || "Something went wrong. Try again later",
        "error"
      );
      endUpdatingUserImage();
    }
  };

  const startUpdatingUserImage = () => {
    setIsUserImageUpdating(true);
  };

  const endUpdatingUserImage = () => {
    setIsUserImageUpdating(false);
  };

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
        isUserImageUpdating,
        setChosenImage,
        openUploadImageModal,
        closeUploadImageModal,
        updateUserUploadedAvatarImages,
        deleteUserAvatarImage,
        startUpdatingUserImage,
        endUpdatingUserImage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserContextProvider;
