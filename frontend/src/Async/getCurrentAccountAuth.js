import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/auth.js";

//you're to continue from here
function getCurrentAccountAuth (){
      const {data:user,status} = useQuery({
        queryKey: ["user"],
        queryFn:getCurrentUser,
        retry:false,
      })
      return {
        user,
        status,
      };
}

export default getCurrentAccountAuth;
