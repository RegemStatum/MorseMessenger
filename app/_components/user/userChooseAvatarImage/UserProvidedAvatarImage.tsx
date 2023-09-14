import { useUserContext } from "@/app/_context/UserContext";
import Image from "next/image";
import { FC } from "react";

type Props = {
  id: number | string;
  name: string;
  src: string;
};

const UserProvidedAvatarImage: FC<Props> = ({ id, name, src }) => {
  const { chosenImage, setChosenImage } = useUserContext();

  const handleClick = () => {
    setChosenImage({ id, url: src });
  };

  return (
    <div
      className={`${
        id === chosenImage.id ? "border-gray-700" : "border-gray-200"
      } border-2 relative w-16 h-16 rounded-md overflow-hidden object-cover cursor-pointer`}
      onClick={handleClick}
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
    </div>
  );
};

export default UserProvidedAvatarImage;
