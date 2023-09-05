import { FC } from "react";

type Props = {
  children: React.ReactNode;
};

const IconWrapper: FC<Props> = ({ children }) => {
  return (
    <div className="bg-neutral-200 p-[1px] rounded-lg cursor-pointer">
      {children}
    </div>
  );
};

export default IconWrapper;
