import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../AuthProvider/AuthContext";
import { useContext } from "react";

const useGetUserData = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/users/${user.email}`);
      console.log(res);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
  

  return { data, isLoading, error, refetch };
};

export default useGetUserData;
