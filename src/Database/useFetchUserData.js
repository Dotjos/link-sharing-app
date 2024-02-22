import { useQuery } from "@tanstack/react-query";
import { fetchUserData } from "./asyncDatabase";

function useFetchUserData (userId){
  const {data:userData, status}= useQuery({
    queryKey:["userData"],
    queryFn:()=>{        
       return fetchUserData(userId)},
       onError:(error)=>{
        console.log(error)
       }
  })
  return { userData, status };
}

export default useFetchUserData;
