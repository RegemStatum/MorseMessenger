import { FC, useEffect, useState } from "react";
import UserSectionContainer from "../UserSectionContainer";
import UserProvidedImages from "./UserProvidedImages";
import { PrimaryButton, LoadingButton } from "../../ui/buttons";
import { useAppContext } from "@/app/_context/AppContext";
import { getAuth, updateProfile } from "firebase/auth";
import { firebase_storage } from "@/app/_firebase/config";
import { getDownloadURL, ref } from "firebase/storage";
import { USER_DEFAULT_IMAGES } from "@/app/_lib/constants/constants";
import { useAuthContext } from "@/app/_context/AuthContext";
import UserAddNewImageButton from "./UserAddNewImageButton";
import { createPortal } from "react-dom";
import UserAddNewImageModal from "./UserAddNewImageModal";
import { useUserContext } from "@/app/_context/UserContext";

const UserChooseUserImage: FC = () => {
  const { showInfoPopup } = useAppContext();
  const { updateLocalUser } = useAuthContext();
  const { chosenImageId, isUploadImageModalOpen } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isDOMReady, setIsDOMReady] = useState(false);

  useEffect(() => {
    setIsDOMReady(true);
  }, []);

  const getImageDownloadURL = async () => {
    const imageName = USER_DEFAULT_IMAGES.find(
      (image) => image.id === chosenImageId
    )?.name;
    if (!imageName) throw new Error("No requested image name");
    const imageStorageRef = ref(firebase_storage, `userPhotos/${imageName}`);
    const imageDownloadURL = await getDownloadURL(imageStorageRef);
    return imageDownloadURL;
  };

  const updateUserImage = async () => {
    try {
      setIsLoading(true);

      const imageDownloadURL = await getImageDownloadURL();
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("No current user");

      await updateProfile(currentUser, {
        photoURL: imageDownloadURL,
      });
      updateLocalUser();

      showInfoPopup("User image updated", "success");
      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      showInfoPopup(
        error.message || "Something went wrong, try again later",
        "error"
      );
      setIsLoading(false);
    }
  };

  return (
    <UserSectionContainer headerText="Choose an image">
      <div className="mb-1 flex gap-1 flex-wrap">
        <UserProvidedImages />
        <UserAddNewImageButton />
        {isDOMReady &&
          isUploadImageModalOpen &&
          createPortal(
            <UserAddNewImageModal />,
            document.getElementById("modals")!
          )}
      </div>
      {isLoading ? (
        <LoadingButton />
      ) : (
        <PrimaryButton onClick={updateUserImage}>Update avatar</PrimaryButton>
      )}
    </UserSectionContainer>
  );
};

export default UserChooseUserImage;
