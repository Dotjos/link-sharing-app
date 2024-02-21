import { useMutation } from "@tanstack/react-query";
import { saveUserLinkData } from "./asyncDatabase";
import toast from "react-hot-toast";

function useSaveLinkData (){
const {mutate:saveLinkDB,status}=  useMutation(
    {mutationFn:(LinkData)=>{
        console.log(LinkData);
        return saveUserLinkData(LinkData)},
        onError:(error)=>{
            console.error(error)
        },
        onSuccess:()=>{
            toast.success("Your changes have been succesffully saved!",{position:"bottom-center", style:{backgroundColor:"#333333",color:"white",fontSize:"0.74rem"},icon:"🗂️" })
        }
    }
)
    return {saveLinkDB,status}
}

export default useSaveLinkData;
