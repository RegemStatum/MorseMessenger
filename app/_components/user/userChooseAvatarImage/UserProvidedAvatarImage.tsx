import { useAuthContext } from "@/app/_context/AuthContext";
import { useUserContext } from "@/app/_context/UserContext";
import Image from "next/image";
import { FC } from "react";
import IconWrapper from "../../ui/icons/IconWrapper";
import { USER_DEFAULT_IMAGES } from "@/app/_lib/constants/constants";

type Props = {
  id: number | string;
  name: string;
  src: string;
};

const xMarkSize = 18;

const UserProvidedAvatarImage: FC<Props> = ({ id, name, src }) => {
  const { user } = useAuthContext();
  const { chosenImage, setChosenImage, deleteUserAvatarImage } =
    useUserContext();

  const handleSelectImage = () => {
    setChosenImage({ id, url: src });
  };

  const handleDeleteImage = () => {
    // id with type of number have only provided images, which shall not be deleted
    if (typeof id === "number") return;
    deleteUserAvatarImage(id, src);
  };

  const checkIsProvidedImage = () => {
    const providedImagesId = USER_DEFAULT_IMAGES.map((image) => image.id);
    return providedImagesId.includes(Number(id));
  };

  return (
    <div
      className={`${
        id === chosenImage.id
          ? "border-gray-700"
          : user?.photoURL === src
          ? "border-blue-500"
          : "border-gray-200"
      } border-2 relative w-16 h-16 rounded-md overflow-hidden object-cover cursor-pointer`}
      onClick={handleSelectImage}
    >
      <Image
        alt={name}
        src={src}
        fill
        blurDataURL={src}
        placeholder="blur"
        className="object-cover"
        quality={100}
        sizes="10vw"
      />
      {id === chosenImage.id && !checkIsProvidedImage() && (
        <div className="absolute right-0 z-10 flex rounded-sm bg-gray-100 bg-opacity-70">
          <IconWrapper onClick={handleDeleteImage}>
            <Image
              src="/images/icons/xMarkIcon.svg"
              alt="close"
              width={xMarkSize}
              height={xMarkSize}
            />
          </IconWrapper>
        </div>
      )}
    </div>
  );
};

export default UserProvidedAvatarImage;
