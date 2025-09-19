import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../Authentication/Auth";

function getCurrentAccountAuth (){
      const {data:user,status} = useQuery({
        queryKey: ["user"],
        queryFn:getCurrentUser,
      })
      return {user,status,isAuthenticated:user?.role==="authenticated"}
}

export default getCurrentAccountAuth;
