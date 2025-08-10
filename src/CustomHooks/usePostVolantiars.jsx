import { useMutation } from "@tanstack/react-query";
import React from "react";
import useAxiosInterceptor from "./useAxiosInterceptor";
import Swal from "sweetalert2";

const usePostVolantiars = () => {
  const axiosSecure = useAxiosInterceptor();

  const {
    mutate: makeOffer,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: async (volantiarData) => {
      const res = await axiosSecure.post("/volantiar", volantiarData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        confirmButtonColor: "#48A6A7",
      });
    },
    onError: (error) => {
      console.error("Offer submission error:", error);
      Swal.fire({
        icon: "error",
        text: error?.response?.data?.error || "Something went wrong.",
        confirmButtonColor: "#48A6A7",
      });
    },
  });
  return { makeOffer, isPending, isSuccess, isError, error };
};

export default usePostVolantiars;
