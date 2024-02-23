import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <>
      <header>
        <h1>My Todo App</h1>
      </header>
      <Outlet />
    </>
  );
};
