import { User } from "firebase/auth";

type AuthContextValue = {
  user: User | null;
  isUserLoading: boolean;
};

export type { AuthContextValue };
