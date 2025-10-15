import { useMutation } from "@tanstack/react-query";
import { saveUserData } from "./asyncDatabase";
 import toast from "react-hot-toast";
function useSaveData (){
    const {mutate:saveDB,status}= useMutation({mutationFn:
      (userData)=>{
        return saveUserData(userData)},
   onSuccess:()=>{
    toast.success("Your changes have been succesffully saved!",{position:"bottom-center", style:{backgroundColor:"#333333",color:"white",fontSize:"0.74rem"},icon:"🗂️" })

   } }
    )
  return {saveDB,status}
}

export default useSaveData;

