import { FC } from "react";
import PrimaryButton from "./PrimaryButton";
import Spinner from "../loaders/Spinner";

const LoadingButton: FC = () => {
  return (
    <PrimaryButton disabled>
      <div className="flex justify-center items-center gap-1">
        <div className="w-[24px] h-[24px] text-gray-600">
          <Spinner />
        </div>
        <p className="text-gray-600 font-bold">Loading...</p>
      </div>
    </PrimaryButton>
  );
};

export default LoadingButton;
