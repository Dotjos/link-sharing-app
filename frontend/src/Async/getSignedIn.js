import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { signInWithEmail } from "../api/auth";
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
        toast.error(error.error || "Check your internet connection or credentials.")
    }})
    return {signIn,status}
}

export default getSignedIn;
