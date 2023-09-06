import AuthModal from "@/app/_components/auth/AuthModal";
import Image from "next/image";

const SignInPage = () => {
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
      <AuthModal action="signin" />
    </div>
  );
};

export default SignInPage;
