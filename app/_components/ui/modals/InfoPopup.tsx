import { useAppContext } from "@/app/_context/AppContext";
import { FC } from "react";

const InfoPopup: FC = () => {
  const {
    infoPopup: { isShown, message, type },
  } = useAppContext();

  const bgColor =
    type === "info"
      ? "bg-blue-300"
      : type === "warning"
      ? "bg-yellow-300"
      : type === "error"
      ? "bg-red-300"
      : "bg-green-300";

  const textColor =
    type === "info"
      ? "text-blue-600"
      : type === "warning"
      ? "text-yellow-600"
      : type === "error"
      ? "text-red-600"
      : "text-green-600";

  return (
    <div
      className={`${
        isShown ? "translate-x-0" : "translate-x-[120%]"
      } max-w-[300px] overflow-x-scroll transform m-1 p-3 rounded-md ${bgColor} ${textColor} transition-transform duration-2000 ease-in-out shadow-sm lg:p-4 lg:text-lg`}
    >
      <p>{message}</p>
    </div>
  );
};

export default InfoPopup;
