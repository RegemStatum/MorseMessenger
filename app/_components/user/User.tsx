"use client";
import { FC } from "react";
import UserImage from "./UserImage";
import { useAuthContext } from "@/app/_context/AuthContext";
import UserCreateNickname from "./UserCreateNickname";

const User: FC = () => {
  const { user } = useAuthContext();

  const UserEmailAndNickname: FC = () => {
    return (
      <div className="flex gap-2">
        <div className="text-gray-600">
          <p>Email: </p>
          <p>Nickname: </p>
        </div>
        <div>
          <p className="truncate">{user?.email}</p>
          <p className="truncate">{user?.displayName || "Barakuda"}</p>
        </div>
      </div>
    );
  };

  const UserEmail: FC = () => {
    return (
      <div className="flex gap-1">
        <p className="text-gray-600">Email:</p>
        <p>{user?.email}</p>
      </div>
    );
  };

  return (
    <div className="grow pt-3">
      <div className="flex items-center gap-2">
        <UserImage />
        {user?.displayName ? <UserEmailAndNickname /> : <UserEmail />}
      </div>
      {!user?.displayName && (
        <div className="my-2">
          <UserCreateNickname />
        </div>
      )}
    </div>
  );
};

export default User;
