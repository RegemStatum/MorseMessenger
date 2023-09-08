"use client";
import { useAuthContext } from "../_context/AuthContext";

const UserPage = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <p>{user?.displayName || user?.email}</p>
    </div>
  );
};

export default UserPage;
