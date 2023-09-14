import { useAuthContext } from "@/app/_context/AuthContext";
import { FC } from "react";
import UserImage from "./UserImage";
import UserSectionContainer from "../UserSectionContainer";

const UserInfo: FC = () => {
  const { user } = useAuthContext();

  const UserEmailAndNickname = (
    <div className="flex gap-2">
      <div className="text-gray-600">
        <p>Email: </p>
        <p>Nickname: </p>
      </div>
      <div className="max-w-[120px]">
        <p className="truncate">{user?.email}</p>
        <p className="truncate">{user?.displayName}</p>
      </div>
    </div>
  );

  const UserEmail = (
    <div className="flex gap-1">
      <p className="text-gray-600">Email:</p>
      <p>{user?.email}</p>
    </div>
  );

  return (
    <UserSectionContainer isClosable={false}>
      <div className="flex items-center gap-2">
        <UserImage />
        {user?.displayName ? UserEmailAndNickname : UserEmail}
      </div>
    </UserSectionContainer>
  );
};

export default UserInfo;
