import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  uploadFile } from "./asyncDatabase";
import toast from "react-hot-toast";

export function useUploadFile (){
    const queryClient=useQueryClient()
    const{mutateAsync:uploadImage,status:uploadStatus} = useMutation({
    mutationFn:(imageFile)=>
         uploadFile(imageFile),
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["userData"]})
        toast.success("Image successfully saved")
    },
    onError:(error)=>{
        console.error(error)
        toast.error("Failed to save Image")
    }
})
   return{uploadImage,uploadStatus}
}

