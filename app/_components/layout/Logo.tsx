import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

const Logo: FC = () => {
  return (
    <Link href="/" className="w-[75px]">
      <Image
        src="/images/layout/logo.svg"
        alt="morse-logo"
        width={112}
        height={39}
      />
    </Link>
  );
};

export default Logo;
