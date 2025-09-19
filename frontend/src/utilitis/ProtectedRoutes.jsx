import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getCurrentAccountAuth from "../Async/getCurrentAccountAuth";

function ProtectedRoutes ({children}){
 const {status,isAuthenticated} = getCurrentAccountAuth()
 const navigate=useNavigate()

 useEffect(function(){
  if(!isAuthenticated&&status !== "pending") {navigate("/")}
 },[isAuthenticated,navigate,status])
 
 if(isAuthenticated)return children
}

export default ProtectedRoutes;



