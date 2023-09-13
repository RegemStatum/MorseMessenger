import Image from "next/image";
import { FC } from "react";

type Props = {
  id: number;
  name: string;
  src: string;
  chosenImageId: number;
  setNewChosenImage: (id: number) => void;
};

const UserProvidedImage: FC<Props> = ({
  id,
  name,
  src,
  chosenImageId,
  setNewChosenImage,
}) => {
  const handleClick = () => {
    setNewChosenImage(id);
  };

  return (
    <div
      className={`${
        id === chosenImageId ? "border-gray-900" : "border-gray-200"
      } border-2 relative w-16 h-16 rounded-md overflow-hidden object-cover`}
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
      />
    </div>
  );
};

export default UserProvidedImage;
