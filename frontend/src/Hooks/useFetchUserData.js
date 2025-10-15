import { useQuery } from "@tanstack/react-query";
import { fetchUserData } from "./asyncDatabase";

function useFetchUserData(userId) {
  const {
    data: userData,
    status,
    error,
  } = useQuery({
    queryKey: ["userData", userId], // 👈 include userId for cache separation
    queryFn: () => fetchUserData(userId), // cleaner
    enabled: !!userId, // 👈 ensures it only runs when userId is available
    staleTime: 1000 * 60 * 5, // optional: keeps data fresh for 5min
    onError: (error) => {
      console.error("Error fetching user data:", error);
    },
  });

  return { userData, status, error };
}

export default useFetchUserData;
