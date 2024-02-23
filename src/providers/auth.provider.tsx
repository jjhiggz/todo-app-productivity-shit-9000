import { ReactNode, createContext, useEffect, useState } from "react";
import { User } from "../types";
import { Requests } from "../api";

type AuthState = "authenticated" | "unauthenticated" | "loading";
type AuthProviderType = {
  user: User | null;
  isLoading: boolean;
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
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

const AuthContext = createContext<AuthProviderType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const authState = deriveAuthState({ user, isLoading });

  useEffect(() => {
    Requests.getAllUsers().then(console.log);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login: async (_email: string, _password: string) => {
          return Promise.resolve();
        },
        isLoading,
        user,
        authState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
