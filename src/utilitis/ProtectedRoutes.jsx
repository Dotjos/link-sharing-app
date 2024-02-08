import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes ({children}){
  const [isAuthenticated,setIsAuthenticated]=useState(false)
  const navigate=useNavigate()

  useEffect(function(){
    const token = localStorage.getItem("sb-abuurbbyjsslbdxcsmtd-auth-token");
    console.log(token);
    setIsAuthenticated(!!token)
    if (!isAuthenticated) {
      navigate("/")
    }

  },[isAuthenticated,navigate])

  
  
  if (isAuthenticated) return children
}

export default ProtectedRoutes;



