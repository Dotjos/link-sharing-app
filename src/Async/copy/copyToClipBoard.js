import { useMutation } from "@tanstack/react-query";
import { asynCopy } from "./asynCopy";
import toast from "react-hot-toast";


function copyToClipBoard() {
  const { mutate: copied, status } = useMutation({mutationFn:(text)=>{
    return asynCopy(text)
},
onSuccess:()=>{
    toast.success("The link has been copied to your clipboard!",{position:"bottom-center", style:{backgroundColor:"#333333",color:"white",fontSize:"0.74rem"}, icon:"🔗"} )
}} 
    );
  return { copied, status };
}

export default copyToClipBoard;
