import { FC } from "react";
import Logo from "./Logo";

const Header: FC = () => {
  return (
    <header>
      <div className="container py-1 flex items-center gap-2">
        <Logo />
        <p>Header</p>
      </div>
    </header>
  );
};

export default Header;
