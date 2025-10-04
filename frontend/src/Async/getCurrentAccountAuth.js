import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/auth.js";

//you're to continue from here
function getCurrentAccountAuth (){
      const {data:user,status} = useQuery({
        queryKey: ["user"],
        queryFn:getCurrentUser,
        retry:false,

      })
      console.log(user);
      return {
        user,
        status,
        isAuthenticated: !!user, // ✅ check if a user object exists
      };
}

export default getCurrentAccountAuth;
