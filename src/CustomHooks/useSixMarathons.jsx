import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useSixMarathons = () => {
  const {
    data: marathons,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["SixMarathons"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/marathons-6`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  return { marathons, isLoading, error, refetch };
};

export default useSixMarathons;
