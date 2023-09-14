import { ButtonHTMLAttributes, FC } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const SecondaryButton: FC<Props> = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className="block w-full p-2 font-medium text-gray-900 rounded-md border border-gray-900 disabled:bg-gray-200 disabled:border-gray-200"
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
