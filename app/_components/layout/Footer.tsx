import { FC } from "react";
import Logo from "./Logo";
import Image from "next/image";
import { PrimaryLink } from "../links";
import { DotSeparator } from "../separators";

const Footer: FC = () => {
  return (
    <footer className="shadow-sm bg-gray-100">
      <div className="h-[1px] bg-gray-200 "></div>
      <div className="container py-1">
        <Logo />
        <div className="flex items-center gap-1">
          <div className="flex gap-[2px]">
            <p>by</p>
            <PrimaryLink href="https://github.com/RegemStatum">
              alkon
            </PrimaryLink>
          </div>
          <DotSeparator />
          <div className="flex gap-[2px]">
            <p>&copy;</p>
            <p>{new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
