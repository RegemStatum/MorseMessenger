import { useAuthContext } from "@/app/_context/AuthContext";
import { FC } from "react";

const UserImage: FC = () => {
  const { user } = useAuthContext();

  return (
    <div className="w-16 h-16 flex justify-center items-center bg-blue-300 p-[1px] rounded-xl cursor-pointer">
      <p className="text-lg font-bold text-blue-600">
        {user?.displayName?.substring(0, 2) || user?.email?.substring(0, 2)}
      </p>
    </div>
  );
};

export default UserImage;
