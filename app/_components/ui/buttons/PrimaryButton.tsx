import { ButtonHTMLAttributes, FC } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const PrimaryButton: FC<Props> = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className="block w-full p-2 font-medium bg-gray-700 text-gray-50 rounded-md border disabled:bg-gray-200 disabled:border-gray-200"
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
