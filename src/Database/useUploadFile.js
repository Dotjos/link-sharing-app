import { useMutation } from "@tanstack/react-query";
import {  uploadFile } from "./asyncDatabase";
import toast from "react-hot-toast";

export function useUploadFile (){
const{mutate:uploadImage,status} = useMutation({
    mutationFn:(fileDetails)=>{
        return uploadFile(fileDetails)},
    onSuccess:()=>{
        toast.success("Image successfully saved")
    },
    onError:(error)=>{
        console.error(error)
        toast.error("Failed to save Image")
    }
})
   return{uploadImage,status}
}

