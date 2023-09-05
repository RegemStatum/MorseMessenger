import { FC } from "react";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container grow">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
