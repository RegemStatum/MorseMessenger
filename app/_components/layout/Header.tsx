import { FC } from "react";
import Logo from "./Logo";
import Image from "next/image";
import IconWrapper from "../icons/IconWrapper";

const headerIconsSize = 32;

const Header: FC = () => {
  return (
    <header className="shadow-sm bg-gray-100">
      <div className="container py-2 flex items-center justify-between">
        <Logo />
        {/* control */}
        <div className="flex gap-1">
          {/* user */}
          <IconWrapper>
            <Image
              src="/images/icons/userIcon.svg"
              alt="menu"
              width={headerIconsSize}
              height={headerIconsSize}
            />
          </IconWrapper>
          {/* search */}
          <IconWrapper>
            <Image
              src="/images/icons/magnifyingGlassIcon.svg"
              alt="menu"
              width={headerIconsSize}
              height={headerIconsSize}
            />
          </IconWrapper>
          {/* burger menu */}
          <IconWrapper>
            <Image
              src="/images/icons/menuBurgerIcon.svg"
              alt="menu"
              width={headerIconsSize}
              height={headerIconsSize}
            />
          </IconWrapper>
        </div>
      </div>
    </header>
  );
};

export default Header;
