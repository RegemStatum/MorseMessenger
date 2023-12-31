"use client";
import { FC } from "react";
import { PrimaryLink } from "../ui/links";
import AuthForm from "./AuthForm";

type Props = {
  action: "signin" | "signup";
  isReauthentication?: boolean;
};

const AuthFormContainer: FC<Props> = ({ action, isReauthentication }) => {
  const formActionText = action === "signup" ? "Sign up" : "Sign in";
  const authLinkText =
    action === "signup"
      ? "I already have an account"
      : "I don't have an account yet";
  const authLinkHref = action === "signup" ? "/auth/signin" : "/auth/signup";

  return (
    <div className="w-full max-w-[450px] mx-auto p-2 bg-white rounded-md shadow-lg lg:max-w-[500px] lg:p-5">
      <div className="mt-2 mb-6 space-y-1 lg:mt-4 lg:mb-8">
        <h1 className="font-roboto font-bold text-lg text-gray-900 text-center lg:text-xl">
          {formActionText}
        </h1>
        <p className="pl-1 text-sm leading-tight text-gray-500 text-center lg:text-base">
          {isReauthentication
            ? "Please, sign in again"
            : `Please, ${formActionText.toLowerCase()} to start using Morse messenger`}
        </p>
      </div>
      <AuthForm action={action} formActionText={formActionText} />
      <div className="mt-2 ml-1 text-sm">
        {!isReauthentication && (
          <PrimaryLink href={authLinkHref}>{authLinkText}</PrimaryLink>
        )}
        <PrimaryLink href="/auth/resetPassword">
          I forgot my password
        </PrimaryLink>
      </div>
    </div>
  );
};

export default AuthFormContainer;
