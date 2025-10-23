import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { signInWithEmail } from "../api/auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Store/AuthSlice";
import { startTokenRefreshTimer } from "../utilitis/tokenManager";

function getSignedIn (){
    const queryClient=useQueryClient()
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const {mutate:signIn,status}=useMutation({mutationFn:({email,password})=>
           {
          return signInWithEmail({email,password})
        },
        
    onSuccess:(data)=>{
        toast.success("Login successful")
        localStorage.setItem("token", data.accessToken); // ✅ save JWT

        dispatch(loginSuccess({
            token:data.accessToken,
            user:data.user
        }))
         startTokenRefreshTimer()
        queryClient.setQueriesData(["user"], data.user) // ✅ update user data in cache;
        navigate("/linkPage")
        },
    onError:(error)=>{
        toast.error(error.error || "Check your internet connection or credentials.")
    }})
    return {signIn,status}
}

export default getSignedIn;
