import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetVolantiars = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["volantiars"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/volantiar`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  return { data, isLoading, error, refetch };
};

export default useGetVolantiars;