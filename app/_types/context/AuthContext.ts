import { User } from "firebase/auth";

export type AuthContextValue = {
  user: User | null;
  isUserLoading: boolean;
};
