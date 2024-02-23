import { useAuth } from "../providers/useAuth";

function Home() {
  const { authState, user, logout } = useAuth();

  return (
    <>
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>

      {authState == "unauthenticated" && <div>Please Log in</div>}
      {authState == "authenticated" && <div>Hello {user?.email}</div>}
      {authState == "loading" && <div>loading...</div>}
    </>
  );
}

export default Home;
