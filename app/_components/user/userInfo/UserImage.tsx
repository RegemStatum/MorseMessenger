import { FC } from "react";
import Image from "next/image";
import { useAuthContext } from "@/app/_context/AuthContext";

const UserImage: FC = () => {
  const { user } = useAuthContext();

  return (
    <div className="relative shrink-0 w-16 h-16 flex justify-center items-center bg-blue-300 p-[1px] rounded-xl overflow-hidden cursor-pointer">
      {user?.photoURL ? (
        <Image
          src={user?.photoURL}
          alt="user photo"
          fill
          className="object-cover"
          quality={100}
        />
      ) : (
        <p className="text-lg font-bold text-blue-600">
          {user?.displayName?.substring(0, 2) || user?.email?.substring(0, 2)}
        </p>
      )}
    </div>
  );
};

export default UserImage;
