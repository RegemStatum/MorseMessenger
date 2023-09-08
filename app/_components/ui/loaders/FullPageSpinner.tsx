import { FC } from "react";
import Spinner from "./Spinner";

const FullPageSpinner: FC = () => {
  return (
    <div className="absolute w-[40px] h-[40px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-[50px] lg:h-[50px]">
      <Spinner />
    </div>
  );
};

export default FullPageSpinner;
