import { useMutation } from "@tanstack/react-query";
import { SignNewUser } from "../Authentication/Auth";
import toast from "react-hot-toast";

export function getCreateAccount() {
  const { mutate: SignNew, status } = useMutation({
    mutationFn: ({ email, password }) =>{
      return SignNewUser(email, password)},
    onSuccess: () => {
      toast.success("Successful, check your mail");
    },
    onError: (error) => {
      toast.error("Kindly check your credentials or network")
      // console.log(error.Error)
    },
  });

  return { SignNew, status };
}




