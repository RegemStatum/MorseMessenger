"use client";
import AuthFormContainer from "@/app/_components/auth/AuthFormContainer";
import FullPageSpinner from "@/app/_components/ui/loaders/FullPageSpinner";
import { useAuthContext } from "@/app/_context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const SignInPage: FC<Props> = ({ searchParams }) => {
  const router = useRouter();
  const { user, isUserLoading } = useAuthContext();
  const isReauthentication = searchParams?.reauthenticate === "true";

  // redirect to user page if user already authenticated and not trying to reauthenticate
  useEffect(() => {
    if (
      ((user && !isUserLoading) || localStorage.getItem("user")) &&
      !isReauthentication
    )
      router.push("/user");
  }, [router, user, isUserLoading, isReauthentication]);

  if (
    (user || isUserLoading || localStorage.getItem("user")) &&
    !isReauthentication
  )
    return <FullPageSpinner />;

  return (
    <div className="pb-20 flex flex-col grow justify-center lg:flex-row-reverse lg:items-center ">
      <div className="pb-4 lg:w-[500px]">
        <Image
          src="/images/auth/signin.svg"
          alt="authenticate"
          width={380}
          height={211}
          className="mx-auto h-[211px] lg:h-[380px]"
        />
      </div>
      <AuthFormContainer
        action="signin"
        isReauthentication={isReauthentication}
      />
    </div>
  );
};

export default SignInPage;
