import { FC } from "react";
import Logo from "./Logo";
import { PrimaryExternalLink } from "../ui/links";
import { DotSeparator } from "../ui/separators";

const Footer: FC = () => {
  return (
    <footer className="shadow-sm bg-gray-100">
      <div className="h-[1px] bg-gray-200 "></div>
      <div className="container py-3 flex items-center gap-3">
        <Logo />
        <DotSeparator />
        <div className="flex gap-[2px]">
          <p>by</p>
          <PrimaryExternalLink href="https://github.com/RegemStatum">
            alkon
          </PrimaryExternalLink>
        </div>
        <DotSeparator />
        <div className="flex gap-[2px]">
          <p>&copy;</p>
          <p>{new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
