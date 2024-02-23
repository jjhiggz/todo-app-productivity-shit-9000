import { ReactNode, createContext, useEffect, useState } from "react";
import { User, userSchema } from "../types";
import { Requests } from "../api";

type AuthState = "authenticated" | "unauthenticated" | "loading";
type AuthProviderType = {
  user: User | null;
  isLoading: boolean;
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const deriveAuthState = ({
  user,
  isLoading,
}: {
  user: User | null;
  isLoading: boolean;
}): AuthState => {
  if (isLoading) return "loading";
  if (user) return "authenticated";
  else return "unauthenticated";
};

const getUserFromDb = (email: string, password: string, allUsers: User[]) => {
  const correctUser = allUsers.find((user) => user.email === email);
  if (!correctUser) {
    console.error("User not found");
    return false;
  }

  if (correctUser.password !== password) {
    console.error("Invalid Password");
    return false;
  }
  return correctUser;
};

const getUserFromLocalStorage = (): User | null => {
  const userFromLocalStorage = localStorage.getItem("user");
  try {
    return userSchema.parse(JSON.parse(userFromLocalStorage || ""));
  } catch (e) {
    console.error(e);
    clearUser();
    return null;
  }
};

const clearUser = () => {
  localStorage.removeItem("user");
};

export const AuthContext = createContext<AuthProviderType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const authState = deriveAuthState({ user, isLoading });
  const logout = () => {
    clearUser();
    setUser(null);
  };

  const login = (email: string, password: string) => {
    return Requests.getAllUsers()
      .then((users) => {
        const userFromDb = getUserFromDb(email, password, users);
        if (!userFromDb) {
          setUser(null);
          return;
        }
        setUser(userFromDb);
        localStorage.setItem("user", JSON.stringify(userFromDb));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const userFromLocalStorage = getUserFromLocalStorage();

    if (!userFromLocalStorage) {
      setIsLoading(false);
      setUser(null);
      return;
    }

    login(userFromLocalStorage.email, userFromLocalStorage.password);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        isLoading,
        user,
        authState,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
