import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { signInWithEmail } from "../Authentication/Auth";
import toast from "react-hot-toast";

function getSignedIn (){
    const queryClient=useQueryClient()
    const navigate=useNavigate()
    const {mutate:signIn,status}=useMutation({mutationFn:({email,password})=>
           {
          return signInWithEmail({email,password})
        },
    onSuccess:(user)=>{
        toast.success("Login successful")
        queryClient.setQueriesData(["user"], user);
        navigate("/linkPage")
        },
    onError:(error)=>{
        // toast.error("Check your internet connection or credentials.")
        toast.error(error.message)
    }})
    return {signIn,status}
}

export default getSignedIn;
