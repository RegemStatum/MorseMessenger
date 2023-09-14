import { FC } from "react";
import Image from "next/image";
import { useUserContext } from "@/app/_context/UserContext";

const plusIconSize = 24;

const UserAddNewAvatarImageButton: FC = () => {
  const { openUploadImageModal } = useUserContext();

  return (
    <button
      onClick={openUploadImageModal}
      className="w-16 h-16 rounded-md  border-2 border-gray-500"
    >
      <Image
        src="/images/icons/plusIcon.svg"
        alt="plus-icon"
        width={plusIconSize}
        height={plusIconSize}
        className="mx-auto"
      />
    </button>
  );
};

export default UserAddNewAvatarImageButton;
