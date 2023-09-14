import { FC, useState } from "react";
import UserSectionContainer from "./UserSectionContainer";
import { SecondaryButton } from "../ui/buttons";
import { getAuth, signOut } from "firebase/auth";
import { useAppContext } from "@/app/_context/AppContext";
import LoadingButton from "../ui/buttons/LoadingButton";

const UserLogOut: FC = () => {
  const { showInfoPopup } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const logOut = async () => {
    try {
      setIsLoading(true);

      const auth = getAuth();
      await signOut(auth);

      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      showInfoPopup(
        error.message || "Something went wrong, try again later",
        "error"
      );
      setIsLoading(false);
    }
  };

  return (
    <UserSectionContainer isClosable={false}>
      {isLoading ? (
        <LoadingButton />
      ) : (
        <SecondaryButton onClick={logOut}>Log out</SecondaryButton>
      )}
    </UserSectionContainer>
  );
};

export default UserLogOut;
