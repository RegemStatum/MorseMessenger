import { FC } from "react";
import Image from "next/image";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  errorMsg?: string;
  functionalIconSrc?: string;
  hintText?: string;
  functionalIconOnClickHandler?: () => void;
}

// invalid:border-red-500 invalid:text-red-500
//       focus:invalid:border-red-500 focus:invalid:ring-red-500

const functionalIconSize = 28;
const hintIconSize = 20;

const Input: FC<Props> = ({
  name,
  label,
  errorMsg,
  functionalIconSrc,
  functionalIconOnClickHandler,
  hintText,
  ...rest
}) => {
  return (
    <div>
      <div className="relative">
        <input
          {...rest}
          id={name}
          name={name}
          className={`w-full ${rest.type === "file" ? "" : "p-2"} ${
            functionalIconSrc ? "pr-10 " : ""
          }bg-gray-100 border-2 border-gray-100 rounded-md text-sm text-gray-900 focus:outline-none focus:border-blue-500 lg:text-base`}
        />
        {functionalIconSrc && (
          <Image
            src={functionalIconSrc}
            alt="show-hide-password"
            width={functionalIconSize}
            height={functionalIconSize}
            onClick={functionalIconOnClickHandler}
            className="absolute top-1/2 right-[8px] -translate-y-1/2 cursor-pointer"
          />
        )}
      </div>
      {hintText && (
        <div className="pt-1 pb-1 flex items-center">
          <Image
            src="/images/icons/exclamationCircleIcon.svg"
            alt="hint"
            width={hintIconSize}
            height={hintIconSize}
          />
          <p className="pl-1 text-sm leading-tight">{hintText}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
