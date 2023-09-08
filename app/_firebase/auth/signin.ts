import firebase_app from "../config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(firebase_app);

const signIn = async (email: string, password: string) => {
  let result = null,
    error = null;

  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e: any) {
    error = e;
  }

  return { result, error };
};

export default signIn;
