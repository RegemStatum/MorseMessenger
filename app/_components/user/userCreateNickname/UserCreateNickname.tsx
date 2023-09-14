import { FC, useState } from "react";
import { SecondaryButton } from "../../ui/buttons";
import UserCreateNicknameForm from "./UserCreateNicknameForm";
import UserSectionContainer from "../UserSectionContainer";

const UserCreateNickname: FC = () => {
  const [isShowInput, setIsShowInput] = useState(false);

  const showInput = () => {
    setIsShowInput(true);
  };

  return (
    <UserSectionContainer
      headerText={isShowInput ? "Create nickname" : "No nickname yet"}
    >
      {isShowInput ? (
        <UserCreateNicknameForm />
      ) : (
        <SecondaryButton onClick={showInput}>Set nickname</SecondaryButton>
      )}
    </UserSectionContainer>
  );
};

export default UserCreateNickname;
