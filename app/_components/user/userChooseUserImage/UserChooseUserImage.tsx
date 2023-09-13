import { FC, useState } from "react";
import UserSectionContainer from "../UserSectionContainer";
import UserProvidedImages from "./UserProvidedImages";
import { PrimaryButton } from "../../ui/buttons";
import LoadingButton from "../../ui/buttons/LoadingButton";
import { useAppContext } from "@/app/_context/AppContext";
import { getAuth, updateProfile } from "firebase/auth";
import { firebase_storage } from "@/app/_firebase/config";
import { getDownloadURL, ref } from "firebase/storage";
import { USER_DEFAULT_IMAGES } from "@/app/_lib/constants/constants";
import { useAuthContext } from "@/app/_context/AuthContext";

const UserChooseUserImage: FC = () => {
  const { showInfoPopup } = useAppContext();
  const { updateLocalUser } = useAuthContext();
  const [chosenImageId, setChosenImageId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const setNewChosenImage = (id: number) => {
    setChosenImageId(id);
  };

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
      <div className="mb-1">
        <UserProvidedImages
          chosenImageId={chosenImageId}
          setNewChosenImage={setNewChosenImage}
        />
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
