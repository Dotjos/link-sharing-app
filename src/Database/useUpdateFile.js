import { useMutation } from "@tanstack/react-query";
import { replaceExistingFile } from "./asyncDatabase";
import toast from "react-hot-toast";

export function useUpdateFile (){
const {mutate:updateImage,status}=useMutation({mutationFn:(avatarFile)=>
    replaceExistingFile(avatarFile),
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
