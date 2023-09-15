import { FC, useEffect, useState } from "react";
import UserSectionContainer from "../UserSectionContainer";
import UserProvidedImages from "./UserProvidedAvatarImages";
import { PrimaryButton, LoadingButton } from "../../ui/buttons";
import { useAppContext } from "@/app/_context/AppContext";
import { getAuth, updateProfile } from "firebase/auth";
import { useAuthContext } from "@/app/_context/AuthContext";
import UserAddNewImageButton from "./UserAddNewAvatarImageButton";
import { createPortal } from "react-dom";
import UserAddNewImageModal from "./UserAddNewAvatarImageModal";
import { useUserContext } from "@/app/_context/UserContext";

const UserChooseAvatarImage: FC = () => {
  const { showInfoPopup } = useAppContext();
  const { updateLocalUser } = useAuthContext();
  const {
    chosenImage,
    isUploadImageModalOpen,
    isUserImageUpdating,
    startUpdatingUserImage,
    endUpdatingUserImage,
  } = useUserContext();
  const [isDOMReady, setIsDOMReady] = useState(false);

  useEffect(() => {
    setIsDOMReady(true);
  }, []);

  const updateUserImage = async () => {
    try {
      startUpdatingUserImage();

      const imageDownloadURL = chosenImage.url;
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("No current user");

      await updateProfile(currentUser, {
        photoURL: imageDownloadURL,
      });
      updateLocalUser();

      showInfoPopup("User image updated", "success");
      endUpdatingUserImage();
    } catch (error: any) {
      console.error(error);
      showInfoPopup(
        error.message || "Something went wrong, try again later",
        "error"
      );
      endUpdatingUserImage();
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
      {isUserImageUpdating ? (
        <LoadingButton />
      ) : (
        <PrimaryButton onClick={updateUserImage}>Update avatar</PrimaryButton>
      )}
    </UserSectionContainer>
  );
};

export default UserChooseAvatarImage;
