import { USER_DEFAULT_IMAGES } from "@/app/_lib/constants/constants";
import UserProvidedImage from "./UserProvidedAvatarImage";
import { useAuthContext } from "@/app/_context/AuthContext";
import { listAll, ref } from "firebase/storage";
import { firebase_storage } from "@/app/_firebase/config";

const UserProvidedAvatarImages = ({}) => {
  const { user } = useAuthContext();

  // const getUserUploadedImages = async () => {
  //   const userId = user?.uid;
  //   const userUploadedPhotosRef = ref(
  //     firebase_storage,
  //     `/userPhotos/${userId}`
  //   );
  //   const uploadedPhotos = await listAll(userUploadedPhotosRef);
  //   console.log("Uploaded photos", uploadedPhotos);
  // };

  // getUserUploadedImages();

  return (
    <>
      {USER_DEFAULT_IMAGES.map((image) => (
        <UserProvidedImage key={image.id} {...image} />
      ))}
    </>
  );
};

export default UserProvidedAvatarImages;
