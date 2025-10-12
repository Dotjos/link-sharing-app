import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { signOut } from "../api/auth";

function useSignOut (){
    const navigate=useNavigate()
const {mutate:logOut,status:logOutStatus}= useMutation({
    mutationFn:signOut,
    onSuccess:()=>{
        navigate("/")
    }
})

return {logOut,logOutStatus}
}

export default useSignOut;
