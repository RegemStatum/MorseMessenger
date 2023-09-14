import { FC } from "react";
import { USER_DEFAULT_IMAGES } from "@/app/_lib/constants/constants";
import UserProvidedImage from "./UserProvidedImage";

const UserProvidedImages = ({}) => {
  return (
    <>
      {USER_DEFAULT_IMAGES.map((image) => (
        <UserProvidedImage key={image.id} {...image} />
      ))}
    </>
  );
};

export default UserProvidedImages;
