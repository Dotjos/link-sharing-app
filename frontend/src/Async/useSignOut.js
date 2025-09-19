import { useMutation } from "@tanstack/react-query";
import { signOut } from "../Authentication/Auth";
import { useNavigate } from "react-router";

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
