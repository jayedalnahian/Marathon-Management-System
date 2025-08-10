import { useQuery } from "@tanstack/react-query";


import axios from "axios";

const useGetMarathonDetails = (id) => {

  console.log('Hook initialized with ID:', id);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["marathonDetails", id],
    queryFn: async () => {
      console.log('Starting API call for ID:', id);
      try {
        const res = await axios.get(`http://localhost:3000/marathon/${id}`);
    
        
        return res.data;
      } catch (err) {
        console.error('API call failed:', err);
        throw err;
      }
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });


  return { data, isLoading, error, refetch };
};

export default useGetMarathonDetails;