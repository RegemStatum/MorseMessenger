import { FC } from "react";
import Logo from "./Logo";
import Image from "next/image";
import IconWrapper from "../ui/icons/IconWrapper";
import Link from "next/link";

const headerIconsSize = 32;

const Header: FC = () => {
  return (
    <header className="shadow-sm bg-gray-100">
      <div className="container py-2 flex items-center justify-between">
        <Logo />
        {/* control */}
        <div className="flex gap-1">
          {/* user */}
          <Link href="/auth/signup">
            <IconWrapper>
              <Image
                src="/images/icons/userIcon.svg"
                alt="menu"
                width={headerIconsSize}
                height={headerIconsSize}
              />
            </IconWrapper>
          </Link>
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
