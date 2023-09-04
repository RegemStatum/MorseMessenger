import { FC } from "react";
import Image from "next/image";

type Props = {
  children: string;
  href: string;
};

const PrimaryLink: FC<Props> = ({ children, href }) => {
  return (
    <div className="flex hover:underline group">
      <a
        href={href}
        target="_blank"
        className="font-semibold text-gray-900 group-hover:text-blue-600"
      >
        {children}
      </a>
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
