export const LoginPage = () => {
  return (
    <div>
      <form>
        <div>
          <label>Email: </label>
          <input type="text" placeholder="email" />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="password" placeholder="password" />
        </div>
      </form>
    </div>
  );
};
