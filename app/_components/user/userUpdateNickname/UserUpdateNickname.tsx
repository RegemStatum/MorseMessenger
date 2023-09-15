import { FC } from "react";
import UserUpdateNicknameForm from "./UserUpdateNicknameForm";
import UserSectionContainer from "../UserSectionContainer";

const UserUpdateNickname: FC = () => {
  return (
    <UserSectionContainer
      headerText="Change nickname"
      isMinimize={true}
      maxHeight="max-h-[95px]"
    >
      <UserUpdateNicknameForm />
    </UserSectionContainer>
  );
};

export default UserUpdateNickname;
