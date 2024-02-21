import { useMutation } from "@tanstack/react-query";
import { saveUserLinkData } from "./asyncDatabase";

function useSaveLinkData (){
const {mutate:saveLinkDB,status}=  useMutation(
    {mutationFn:(LinkData)=>{
        console.log(LinkData);
        return saveUserLinkData(LinkData)},
        onError:(error)=>{
            console.error(error)
        },
        onSuccess:()=>{}
    }
)
    return {saveLinkDB,status}
}

export default useSaveLinkData;
