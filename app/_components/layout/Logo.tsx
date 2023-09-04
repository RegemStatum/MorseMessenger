import { FC } from "react";
import Image from "next/image";

const Logo: FC = () => {
  return (
    <div className="w-[85px]">
      <Image
        src="/images/layout/logo.svg"
        alt="morse-logo"
        width={112}
        height={39}
      />
    </div>
  );
};

export default Logo;
