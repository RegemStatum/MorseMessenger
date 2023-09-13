import { FC, useState } from "react";
import Input from "../../ui/forms/Input";
import { PrimaryButton } from "../../ui/buttons";
import { useAppContext } from "@/app/_context/AppContext";
import LoadingButton from "../../ui/buttons/LoadingButton";
import { getAuth, updateProfile } from "firebase/auth";

type Props = {};

const UserCreateNicknameForm: FC<Props> = ({}) => {
  const { showInfoPopup } = useAppContext();
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setNickname(newNickname);
  };

  const updateUserDisplayName = async (newDisplayName: string) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("No current user");
    await updateProfile(currentUser, {
      displayName: newDisplayName,
    });
  };

  const handleFormSubmit = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      await updateUserDisplayName(nickname);

      showInfoPopup("Nickname created", "info");
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      showInfoPopup(
        error.message || "Something went wrong. Try again later",
        "error"
      );
      setIsLoading(false);
    }
  };

  return (
    <form className="flex gap-1">
      <div className="grow">
        <Input
          value={nickname}
          onChange={handleInputChange}
          name="nickname"
          placeholder="Enter your new nickname"
          disabled={isLoading}
        />
      </div>
      <div className="w-[79px]">
        {isLoading ? (
          <LoadingButton />
        ) : (
          <PrimaryButton onClick={handleFormSubmit}>Confirm</PrimaryButton>
        )}
      </div>
    </form>
  );
};

export default UserCreateNicknameForm;
