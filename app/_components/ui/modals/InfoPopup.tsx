import { useAppContext } from "@/app/_context/AppContext";
import { HIDE_INFOPOPUP_AFTER_DEFAULT_MS } from "@/app/_lib/constants/constants";
import { FC, useEffect, useState } from "react";

const transitionDuration = `duration-${HIDE_INFOPOPUP_AFTER_DEFAULT_MS}`;

const InfoPopup: FC = () => {
  const {
    infoPopup: { isShown, message, type },
  } = useAppContext();
  const [infoPopupStyle, setInfoPopupStyle] = useState({});

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (!isShown) {
      timer = setTimeout(() => {
        setInfoPopupStyle({ width: 0, height: 0, padding: 0, margin: 0 });
      }, HIDE_INFOPOPUP_AFTER_DEFAULT_MS + 100);
    } else {
      setInfoPopupStyle({});
    }
    if (timer) return () => clearTimeout(timer);
  }, [isShown, message]);

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
      style={infoPopupStyle}
      className={`${
        isShown ? "translate-x-0 " : "translate-x-[120%]"
      }  max-w-[300px] m-1 p-3 overflow-x-auto transform rounded-md ${bgColor} ${textColor} transition-transform ${transitionDuration} ease-in-out shadow-sm lg:p-4 lg:text-lg`}
    >
      <p>{message}</p>
    </div>
  );
};

export default InfoPopup;
