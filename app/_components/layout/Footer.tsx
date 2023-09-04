import { FC } from "react";
import Logo from "./Logo";
import { DotSeparator } from "../separators";

const Footer: FC = () => {
  return (
    <footer>
      <div className="container py-1">
        <Logo />
        <div className="flex items-center gap-1 leading-tight">
          <div className="flex gap-[2px]">
            <p>by</p>
            <a
              href="https://github.com/RegemStatum"
              className="font-semibold text-gray-900"
            >
              alkon
            </a>
          </div>
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
