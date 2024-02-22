import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateFile } from "./asyncDatabase";

export function useUpdateFile (){
    const queryClient=useQueryClient()
const {mutate:updateImage,status:updateStatus}=useMutation({mutationFn:(avatarFile)=>
    {   
        return updateFile(avatarFile)},
onSuccess:()=>{
    toast.success("Your changes have been successfully saved!")
    queryClient.invalidateQueries({queryKey:["urlPath"]})
},
onError:(error)=>{
toast.error(error.message)
}
}
)

return {updateImage,updateStatus}
}
