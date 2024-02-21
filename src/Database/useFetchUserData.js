import { useQuery } from "@tanstack/react-query";
import { fetchUserData } from "./asyncDatabase";
import { setUserData } from "../Store/LinkDetailsSlice";
import { useEffect } from "react";

function useFetchUserData (userId, dispatch){
  const {data:userData, status}= useQuery({
    queryKey:["userData"],
    queryFn:()=>{        
       return fetchUserData(userId)},
       onError:(error)=>{
        console.log(error)
       }
  })

  useEffect(() => {
    if(dispatch){
  if (userData) {
    dispatch(setUserData(userData.linkdetails));
  }}
}, [userData, dispatch]);
  

  return { userData, status };
}

export default useFetchUserData;
