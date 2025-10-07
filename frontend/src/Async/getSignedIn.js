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
        
    onSuccess:(data)=>{
        toast.success("Login successful")
        localStorage.setItem("token", data.token); // ✅ save JWT
        queryClient.setQueriesData(["user"], data.user) // ✅ update user data in cache;
        navigate("/linkPage")
        },
    onError:(error)=>{
        toast.error(error.error || "Check your internet connection or credentials.")
    }})
    return {signIn,status}
}

export default getSignedIn;
