"use client";
import { FC } from "react";
import { useAuthContext } from "@/app/_context/AuthContext";
import UserCreateNickname from "./userCreateNickname/UserCreateNickname";
import UserInfo from "./userInfo/UserInfo";
import UserChangePassword from "./UserChangePassword";
import UserLogOut from "./UserLogOut";
import UserChooseAvatarImage from "./userChooseAvatarImage/UserChooseAvatarImage";

const User: FC = () => {
  const { user } = useAuthContext();

  return (
    <div className="flex flex-col gap-2 grow pt-3">
      <UserInfo />
      <UserChooseAvatarImage />
      {!user?.displayName && <UserCreateNickname />}
      <UserChangePassword />
      <UserLogOut />
    </div>
  );
};

export default User;
