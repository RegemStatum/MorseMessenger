import { FC } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPasswordContainer: FC = () => {
  return (
    <div className="w-full max-w-[450px] mx-auto p-2 bg-white rounded-md shadow-lg lg:max-w-[500px] lg:p-5">
      <div className="mt-2 mb-6 space-y-1 lg:mt-4 lg:mb-8">
        <h1 className="font-roboto font-bold text-lg text-gray-900 text-center lg:text-xl">
          Password reset
        </h1>
        <p className="pl-1 text-sm leading-tight text-gray-500 text-center lg:text-base">
          Instructions will be sent on provided email
        </p>
      </div>
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordContainer;
