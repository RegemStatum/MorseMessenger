import { FC, useState } from "react";
import IconWrapper from "../ui/icons/IconWrapper";
import { SecondaryButton } from "../ui/buttons";
import Image from "next/image";
import UserCreateNicknameForm from "./UserCreateNicknameForm";

const xMarkSize = 24;

const UserCreateNickname: FC = () => {
  const [isShowInput, setIsShowInput] = useState(false);

  const showInput = () => {
    setIsShowInput(true);
  };

  return (
    <div className="p-2 shadow-md rounded-md bg-white">
      <div className="pt-1 pb-2  flex items-center justify-between">
        <p className="pl-1">
          {isShowInput ? "Create nickname" : "No nickname yet"}
        </p>
        <div className="shrink">
          <IconWrapper>
            <Image
              src="/images/icons/xMarkIcon.svg"
              alt="close"
              width={xMarkSize}
              height={xMarkSize}
            />
          </IconWrapper>
        </div>
      </div>
      <div>
        {isShowInput ? (
          <UserCreateNicknameForm />
        ) : (
          <SecondaryButton onClick={showInput}>Set nickname</SecondaryButton>
        )}
      </div>
    </div>
  );
};

export default UserCreateNickname;
