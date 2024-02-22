import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchImageUrl } from "./asyncDatabase";

export function useFetchUrl (pathName){
  const queryClient=useQueryClient()
  const{data:imageURL,status} =useQuery({
    queryKey:["urlPath"],
    queryFn:()=>fetchImageUrl(pathName),
  })

  const invalidateUrlPathQuery = () => {
    queryClient.invalidateQueries({queryKey:["urlPath"]});
  };

  return {imageURL,status,invalidateUrlPathQuery}
}
