import { useMutation } from "@tanstack/react-query";
import { SignNewUser } from "../Authentication/Auth";
import toast from "react-hot-toast";

export function getCreateAccount() {
  const { mutate: SignNew, status } = useMutation({
    mutationFn: ( {email, password }) => SignNewUser(email, password),
    onSuccess: () => {
      toast.success("Successful, check your mail");
    },
    onError: (error) => {
      console.error("Error during authentication:", error);
      toast.error("Error, try again!!!");
    },
  });

  return { SignNew, status };
}






// export function getCreateAccount (){
// const { mutate:SignNew,status} = useMutation({
//     mutationFn:({email,password})=>SignNewUser({email,password},
//         onSuccess:()=>{
//             toast.success("Successful,check your mail")
//         },
//         onError:(error)=>{
//             console.error("Error during authentication:", error);
//             toast.error("Error, try again!!!")}  
//         )
//     },
//     )
// return{SignNew,status}
// }

