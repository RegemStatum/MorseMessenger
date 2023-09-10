import { getAuth, updateProfile } from "firebase/auth";
import firebase_app from "../config";

const updateUserDisplayName = async (newDisplayName: string) => {
  const auth = getAuth(firebase_app);
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("No current user");
  await updateProfile(currentUser, {
    displayName: newDisplayName,
  });
};

export default updateUserDisplayName;
