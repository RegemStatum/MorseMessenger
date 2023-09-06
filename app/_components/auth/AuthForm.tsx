"use client";
import { FC, useState } from "react";
import Input from "../ui/forms/Input";
import { PrimaryButton } from "../ui/buttons";

type Props = {
  formActionText: string;
};

const AuthForm: FC<Props> = ({ formActionText }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const toggleIsPasswordShown = () => {
    const newIsPasswordShown = !isPasswordShown;
    setIsPasswordShown(newIsPasswordShown);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-1">
      <Input name="email" placeholder="Email" type="email" minLength={3} />
      <Input
        name="password"
        placeholder="Password"
        type={isPasswordShown ? "text" : "password"}
        minLength={8}
        functionalIconSrc={
          isPasswordShown
            ? "/images/icons/eyeSolidIcon.svg"
            : "/images/icons/eyeIcon.svg"
        }
        functionalIconOnClickHandler={toggleIsPasswordShown}
        hintText="Password length must be from 8 to 16 characters"
      />

      <PrimaryButton>{formActionText}</PrimaryButton>
    </form>
  );
};

export default AuthForm;
