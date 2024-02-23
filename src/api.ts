import { z } from "zod";
import { userSchema } from "./types";

export const Requests = {
  getAllUsers: () =>
    fetch("http://localhost:3000/users")
      .then((response) => {
        if (!response.ok) throw new Error("Could not fetch users");
        return response.json();
      })
      .then(z.array(userSchema).parse),
};
