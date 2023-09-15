"use client";
import { FC, useState } from "react";
import UserSectionContainer from "./UserSectionContainer";
import Input from "../ui/forms/Input";
import { useAuthContext } from "@/app/_context/AuthContext";
import { updatePassword } from "firebase/auth";
import { PrimaryButton } from "../ui/buttons";
import { useAppContext } from "@/app/_context/AppContext";
import LoadingButton from "../ui/buttons/LoadingButton";
import localValidatePassword from "@/app/_lib/helpers/localValidatePassword";
import { useRouter } from "next/navigation";

type Props = {};

const defaultNewPassword = {
  value: "",
  confirmationValue: "",
};

const UserChangePassword: FC<Props> = ({}) => {
  const router = useRouter();
  const { showInfoPopup } = useAppContext();
  const { user } = useAuthContext();
  const [newPassword, setNewPassword] = useState({ ...defaultNewPassword });
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isConfirmationPasswordShown, setIsConfirmationPasswordShown] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if (name === "newPassword") {
      setNewPassword({ ...newPassword, value });
    }
    if (name === "newPasswordConfirmation") {
      setNewPassword({ ...newPassword, confirmationValue: value });
    }
  };

  const handleFormSubmit = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      setIsLoading(true);

      if (!user) throw new Error("No user, Reauthenticate please");
      if (newPassword.value !== newPassword.confirmationValue)
        throw new Error("Password are not identical");

      // validate password
      const validation = localValidatePassword(newPassword.value);
      if (!validation.isValid) throw new Error("Password is not valid");

      await updatePassword(user, newPassword.value);

      // reset inputs
      setNewPassword({ ...defaultNewPassword });

      showInfoPopup("Password changed", "success");
      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      if (error.code === "auth/requires-recent-login") {
        showInfoPopup(
          "Re-authentication is required to change password",
          "info"
        );
        router.push("/auth/signin?reauthenticate=true");
        return;
      }
      showInfoPopup(error.message || "Something went wrong", "error");
      setIsLoading(false);
    }
  };

  const toggleIsPasswordShown = () => {
    const newIsPasswordShown = !isPasswordShown;
    setIsPasswordShown(newIsPasswordShown);
  };

  const toggleIsConfirmationPasswordShown = () => {
    const newIsConfirmationPasswordShown = !isConfirmationPasswordShown;
    setIsConfirmationPasswordShown(newIsConfirmationPasswordShown);
  };

  return (
    <UserSectionContainer
      headerText="Change password"
      isMinimize={true}
      maxHeight="max-h-[225px]"
    >
      <form className="flex flex-col gap-1">
        <Input
          name="newPassword"
          placeholder="New password"
          value={newPassword.value}
          onChange={handleInputChange}
          minLength={8}
          maxLength={16}
          type={isPasswordShown ? "text" : "password"}
          functionalIconSrc={
            newPassword.value.length === 0
              ? ""
              : isPasswordShown
              ? "/images/icons/eyeSolidIcon.svg"
              : "/images/icons/eyeIcon.svg"
          }
          functionalIconOnClickHandler={toggleIsPasswordShown}
        />
        <Input
          name="newPasswordConfirmation"
          placeholder="Confirm new password"
          value={newPassword.confirmationValue}
          onChange={handleInputChange}
          minLength={8}
          maxLength={16}
          type={isConfirmationPasswordShown ? "text" : "password"}
          functionalIconSrc={
            newPassword.confirmationValue.length === 0
              ? ""
              : isConfirmationPasswordShown
              ? "/images/icons/eyeSolidIcon.svg"
              : "/images/icons/eyeIcon.svg"
          }
          functionalIconOnClickHandler={toggleIsConfirmationPasswordShown}
          hintText="Password length must be from 8 to 16 characters"
        />
        {isLoading ? (
          <LoadingButton />
        ) : (
          <PrimaryButton onClick={handleFormSubmit}>
            Change password
          </PrimaryButton>
        )}
      </form>
    </UserSectionContainer>
  );
};

export default UserChangePassword;
