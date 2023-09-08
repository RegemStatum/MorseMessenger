"use client";
import { FC } from "react";
import Logo from "./Logo";
import Image from "next/image";
import IconWrapper from "../ui/icons/IconWrapper";
import Link from "next/link";
import { useAuthContext } from "@/app/_context/AuthContext";

const headerIconsSize = 32;

const Header: FC = () => {
  const { user } = useAuthContext();

  const UserAuthenticatedIcon: FC = () => {
    return (
      <Link href="/user">
        <div className="bg-blue-300 p-[1px] rounded-xl cursor-pointer">
          <div
            style={{ width: headerIconsSize, height: headerIconsSize }}
            className="flex justify-center items-center"
          >
            <p className="font-bold text-blue-600">
              {user?.displayName?.substring(0, 2) ||
                user?.email?.substring(0, 2)}
            </p>
          </div>
        </div>
      </Link>
    );
  };

  const UserUnauthenticatedIcon: FC = () => {
    return (
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
    );
  };

  return (
    <header className="shadow-sm bg-gray-100">
      <div className="container py-2 flex items-center justify-between">
        <Logo />
        {/* control */}
        <div className="flex gap-1">
          {/* user */}
          {user ? <UserAuthenticatedIcon /> : <UserUnauthenticatedIcon />}
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
