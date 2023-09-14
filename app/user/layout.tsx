import { FC } from "react";
import { UserContextProvider } from "../_context";

type Props = {
  children: React.ReactNode;
};

const UserLayout: FC<Props> = ({ children }) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};

export default UserLayout;
