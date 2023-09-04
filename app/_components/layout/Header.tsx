import { FC } from "react";
import Logo from "./Logo";
import Image from "next/image";

const Header: FC = () => {
  return (
    <header className="shadow-sm bg-gray-100">
      <div className="container py-1 flex items-center justify-between">
        <Logo />
        {/* control */}
        <div className="flex gap-1">
          {/* search */}
          <Image
            src="/images/icons/magnifyingGlassIcon.svg"
            alt="menu"
            width={31}
            height={31}
          />
          {/* burger menu */}
          <Image
            src="/images/icons/menuBurgerIcon.svg"
            alt="menu"
            width={36}
            height={36}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
