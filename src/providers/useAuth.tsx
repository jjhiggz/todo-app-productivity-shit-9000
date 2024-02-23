import { useContext } from "react";
import { AuthContext } from "./auth.provider";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error(
      "Please use 'useAuth' hook within the context of a AuthProvider",
    );
  return context;
};
