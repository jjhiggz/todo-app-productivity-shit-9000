import { Navigate, redirect } from "react-router";
import { useAuth } from "../providers/useAuth";
import { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { authState } = useAuth();

  if (authState === "loading") return <div>loading...</div>;
  if (authState === "unauthenticated") {
    redirect("/login");
    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
};

export const ReverseProtectedRoute = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { authState } = useAuth();

  if (authState === "loading") return <div>loading...</div>;
  if (authState === "unauthenticated") {
    return <>{children}</>;
  }

  redirect("/login");
  return <Navigate to={"/"} />;
};
