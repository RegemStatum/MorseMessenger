import { User } from "firebase/auth";

type AuthContextValue = {
  user: User | null;
  isUserLoading: boolean;
  updateLocalUser: () => void;
};

export type { AuthContextValue };
