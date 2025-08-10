import { useQuery } from "@tanstack/react-query";

import axios from "axios";

const useGetApplyedMarathons = (userId) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["myApplyed"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/my-registrations/${userId}`
        );

        return res.data;
      } catch (err) {
        console.error("API call failed:", err);
        throw err;
      }
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!userId,
  });

  return { data, isLoading, error, refetch };
};

export default useGetApplyedMarathons;
