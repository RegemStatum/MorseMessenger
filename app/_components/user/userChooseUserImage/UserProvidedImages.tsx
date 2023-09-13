import { FC } from "react";
import { USER_DEFAULT_IMAGES } from "@/app/_lib/constants/constants";
import UserProvidedImage from "./UserProvidedImage";

type Props = {
  chosenImageId: number;
  setNewChosenImage: (id: number) => void;
};

const UserProvidedImages: FC<Props> = ({
  chosenImageId,
  setNewChosenImage,
}) => {
  return (
    <div className="flex gap-1 flex-wrap">
      {USER_DEFAULT_IMAGES.map((image) => (
        <UserProvidedImage
          key={image.id}
          {...image}
          chosenImageId={chosenImageId}
          setNewChosenImage={setNewChosenImage}
        />
      ))}
    </div>
  );
};

export default UserProvidedImages;
