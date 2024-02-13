import { useMutation } from "@tanstack/react-query";
import { uploadfile } from "./asyncDatabase";
import toast from "react-hot-toast";

export function useUploadFile (){
const{mutate:uploadImage,status} = useMutation({
    mutationFn:({avatarFile,userEmail})=>{
        return uploadfile({avatarFile,userEmail})},
    onSuccess:()=>{
        toast.success("Image successfully uploaded")
    },
    onError:(error)=>{
        console.error(error)
        toast.error("Failed to upload Image")
    }
})
   return{uploadImage,status}
}

