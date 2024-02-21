import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateFile } from "./asyncDatabase";

export function useUpdateFile (){
const {mutate:updateImage,status}=useMutation({mutationFn:(avatarFile)=>
    {   
        return updateFile(avatarFile)},
onSuccess:()=>{
    toast.success("Your changes have been successfully saved!")
},
onError:(error)=>{
toast.error(error.message)
}
}
)

return {updateImage,status}
}
