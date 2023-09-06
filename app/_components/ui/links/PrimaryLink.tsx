import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  children: string;
  href: string;
};

const PrimaryLink: FC<Props> = ({ children, href }) => {
  return (
    <div className="flex hover:underline group">
      <Link
        href={href}
        className="font-semibold text-gray-900 group-hover:text-blue-600"
      >
        {children}
      </Link>
      <div className="w-[16px] pt-[2px]">
        <Image
          src="/images/icons/linkArrowIcon.svg"
          alt="link"
          width={24}
          height={24}
        />
      </div>
    </div>
  );
};

export default PrimaryLink;
