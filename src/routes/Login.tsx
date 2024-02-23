import { useState } from "react";
import { useAuth } from "../providers/useAuth";

export const LoginPage = () => {
  const { login } = useAuth();

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const reset = () => {
    setEmailInput("");
    setPasswordInput("");
  };

  return (
    <>
      <form
        id="auth-form"
        onSubmit={(e) => {
          e.preventDefault();
          login(emailInput, passwordInput);
          reset();
        }}
      >
        <h3>Sign In: </h3>
        <div>
          <label>Email: </label>
          <input
            type="text"
            placeholder="email"
            onChange={(e) => {
              setEmailInput(e.target.value);
            }}
            value={emailInput}
          />
        </div>
        <div>
          <label htmlFor="">Password: </label>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPasswordInput(e.target.value);
            }}
            value={passwordInput}
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};
