import { ButtonHTMLAttributes, FC } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const TertiaryButton: FC<Props> = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className="block font-medium selection:leading-8 text-gray-900 hover:underline"
    >
      {children}
    </button>
  );
};

export default TertiaryButton;
