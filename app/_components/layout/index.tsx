"use client";
import { FC } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useAuthContext } from "@/app/_context/AuthContext";
import FullPageSpinner from "../ui/loaders/FullPageSpinner";

type Props = {
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  const { isUserLoading } = useAuthContext();

  return (
    <>
      <Header />
      <main className="relative flex grow">
        <div id="modals" className="top-0 left-0"></div>
        <div className="relative container">
          {isUserLoading ? <FullPageSpinner /> : children}
          <div
            id="info-popup"
            className="absolute right-2 bottom-2 overflow-hidden"
          ></div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
