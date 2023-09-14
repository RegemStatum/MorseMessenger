import { USER_DEFAULT_IMAGES } from "@/app/_lib/constants/constants";
import UserProvidedImage from "./UserProvidedAvatarImage";
import { useUserContext } from "@/app/_context/UserContext";

const UserProvidedAvatarImages = () => {
  const { userUploadedAvatars } = useUserContext();

  return (
    <>
      {USER_DEFAULT_IMAGES.map((image) => (
        <UserProvidedImage key={image.id} {...image} />
      ))}
      {userUploadedAvatars &&
        userUploadedAvatars.map((image) => (
          <UserProvidedImage key={image.id} {...image} />
        ))}
    </>
  );
};

export default UserProvidedAvatarImages;
