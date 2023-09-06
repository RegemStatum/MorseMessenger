import { ButtonHTMLAttributes, FC } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const PrimaryButton: FC<Props> = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className="block w-full p-1 leading-8 bg-gray-900 text-gray-50 rounded-md border lg:p-2"
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
