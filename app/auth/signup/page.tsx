import AuthModal from "@/app/_components/auth/AuthModal";
import Image from "next/image";

const SignUpPage = () => {
  return (
    <div className="pb-20 flex flex-col grow justify-center lg:flex-row-reverse lg:items-center ">
      <div className="pb-4">
        <Image
          src="/images/auth/signup.svg"
          alt="authenticate"
          width={500}
          height={211}
          className="mx-auto h-[211px] lg:h-[500px]"
        />
      </div>
      <AuthModal action="signup" />
    </div>
  );
};

export default SignUpPage;
