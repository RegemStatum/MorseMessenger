import { ChangeEvent, FC, useState } from "react";
import IconWrapper from "../../ui/icons/IconWrapper";
import Image from "next/image";
import { useUserContext } from "@/app/_context/UserContext";
import Input from "../../ui/forms/Input";
import { PrimaryButton } from "../../ui/buttons";
import { ref, uploadBytes } from "firebase/storage";
import { firebase_storage } from "@/app/_firebase/config";
import LoadingButton from "../../ui/buttons/LoadingButton";
import { useAppContext } from "@/app/_context/AppContext";
import { useAuthContext } from "@/app/_context/AuthContext";

const xMarkIconSize = 24;
const maxImageSizeMB = 5;

const UserAddNewImageModal: FC = () => {
  const { showInfoPopup } = useAppContext();
  const { user } = useAuthContext();
  const { closeUploadImageModal } = useUserContext();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newImageFile = e.target.files ? e.target.files[0] : null;
    if (!newImageFile) throw new Error("Image was not provided");

    const isValid = checkImageSize(newImageFile);
    if (!isValid) throw new Error(`Image size exceeds ${maxImageSizeMB} MB`);

    setImageFile(newImageFile);
  };

  const checkImageSize = (imageFile: File) => {
    let isValid = true;
    const fileSizeMB = imageFile.size / 1024 / 1024; // MB
    if (fileSizeMB > maxImageSizeMB) isValid = false;
    return isValid;
  };

  const uploadImage = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      if (!imageFile) throw new Error("Image was not provided");

      const userID = user?.uid;
      const imageName = `${imageFile?.name}date=${Date.now()}`;
      const imageStorageRef = ref(
        firebase_storage,
        `userPhotos/${userID}/${imageName}`
      );
      await uploadBytes(imageStorageRef, imageFile);

      showInfoPopup("Image uploaded", "success");
      setIsLoading(false);
      closeUploadImageModal();
    } catch (error: any) {
      console.error(error);
      showInfoPopup(
        error.message || "Something went wrong. Try again later",
        "error"
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute z-10 w-full h-full flex justify-center items-center bg-gray-200">
      <div className="rounded-md p-3 bg-gray-100 shadow-xl">
        <div className="mb-3 flex justify-between items-center">
          <h2 className="text-xl">Upload your image</h2>
          <IconWrapper onClick={closeUploadImageModal}>
            <Image
              src="/images/icons/xMarkIcon.svg"
              alt="close"
              width={xMarkIconSize}
              height={xMarkIconSize}
            />
          </IconWrapper>
        </div>
        <div>
          <ul className="list-disc list-inside">
            <li>Image size must be less than 5MB</li>
            <li>Image must be of .jpg or .png extension</li>
          </ul>
          <form>
            <div className="mt-2 mb-1">
              <Input
                type="file"
                name="userImage"
                onChange={handleImageChange}
                accept=".jpg, .jpeg, .png"
              />
            </div>
            {isLoading ? (
              <LoadingButton />
            ) : (
              <PrimaryButton onClick={uploadImage}>Upload image</PrimaryButton>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserAddNewImageModal;
