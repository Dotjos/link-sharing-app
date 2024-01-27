import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { signInWithEmail } from "../Authentication/Auth";
import toast from "react-hot-toast";


function getSignedIn (){
    const queryClient=useQueryClient()
    // const navigate=useNavigate()
    const {mutate:signInWithEmail,status}=useMutation({mutationFn:({email,password})=>
           {signInWithEmail({email,password})},
    onSuccess:(user)=>{
        toast.success("Login successful")
        queryClient.setQueriesData(["user"], user);
        // navigate("/linkPage",{replace:true})
    },
    onError:()=>{
        toast.error("Check your internet connection or credentials.")
    }})
    return {signInWithEmail,status}
}

export default getSignedIn;
