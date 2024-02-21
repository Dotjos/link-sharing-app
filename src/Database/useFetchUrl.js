import { useQuery } from "@tanstack/react-query";
import { fetchImageUrl } from "./asyncDatabase";

export function useFetchUrl (pathName){
  const{data:imageURL,status} =useQuery({
    queryKey:["urlPath"],
    queryFn:()=>fetchImageUrl(pathName),
   
  })
  return {imageURL,status}
}
