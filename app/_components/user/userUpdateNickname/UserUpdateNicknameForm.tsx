import { FC, useState } from "react";
import Input from "../../ui/forms/Input";
import { MiniLoadingButton, PrimaryButton } from "../../ui/buttons";
import { useAppContext } from "@/app/_context/AppContext";
import { getAuth, updateProfile } from "firebase/auth";
import { useAuthContext } from "@/app/_context/AuthContext";

const UserUpdateNicknameForm: FC = () => {
  const { showInfoPopup } = useAppContext();
  const { updateLocalUser } = useAuthContext();
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
    updateLocalUser();
    setNickname("");
  };

  const handleFormSubmit = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      await updateUserDisplayName(nickname);

      showInfoPopup("Nickname has been updated", "success");
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
          <MiniLoadingButton />
        ) : (
          <PrimaryButton onClick={handleFormSubmit}>Confirm</PrimaryButton>
        )}
      </div>
    </form>
  );
};

export default UserUpdateNicknameForm;
