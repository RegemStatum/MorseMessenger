import { FC } from "react";
import PrimaryButton from "./PrimaryButton";
import Spinner from "../loaders/Spinner";

const MiniLoadingButton: FC = () => {
  return (
    <PrimaryButton disabled>
      <div className="flex justify-center items-center gap-1">
        <div className="w-[24px] h-[24px] text-gray-600">
          <Spinner />
        </div>
      </div>
    </PrimaryButton>
  );
};

export default MiniLoadingButton;
