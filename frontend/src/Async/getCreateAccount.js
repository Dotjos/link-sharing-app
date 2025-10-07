// Async/getCreateAccount.js
import { useMutation } from "@tanstack/react-query";
import { SignNewUser } from "../api/auth";
import toast from "react-hot-toast";

export function getCreateAccount() {
  return useMutation({
    mutationFn: ({ email, password }) => SignNewUser(email, password),
    onSuccess: (data) => {
      toast.success(data.message || "Account created! Check your email.");
    },
    onError: (err) => {
      toast.error(err.error || "Something went wrong");
    },
  });
}