"use client";
import { PrimaryButton } from "@/app/_components/ui/buttons";
import LoadingButton from "@/app/_components/ui/buttons/LoadingButton";
import Input from "@/app/_components/ui/forms/Input";
import { useAppContext } from "@/app/_context/AppContext";
import localValidateEmail from "@/app/_lib/helpers/localValidateEmail";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ResetPasswordForm = () => {
  const router = useRouter();
  const { showInfoPopup } = useAppContext();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const handleFormSubmit = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      setIsLoading(true);

      // validate email
      const validation = localValidateEmail(email);
      if (!validation.isValid) throw new Error(validation.message);

      // send email
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);

      router.push("/auth/signin");
      showInfoPopup("Email has been sent", "info");
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
    <form className="space-y-1">
      <Input
        value={email}
        onChange={handleEmailChange}
        name="email"
        placeholder="Email"
        type="email"
        minLength={3}
      />
      {isLoading ? (
        <LoadingButton />
      ) : (
        <PrimaryButton onClick={handleFormSubmit}>Send email</PrimaryButton>
      )}
    </form>
  );
};

export default ResetPasswordForm;
