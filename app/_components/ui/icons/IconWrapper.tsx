import { ButtonHTMLAttributes, FC } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const IconWrapper: FC<Props> = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className="hover:bg-neutral-200 p-[1px] rounded-xl cursor-pointer"
    >
      {children}
    </button>
  );
};

export default IconWrapper;
