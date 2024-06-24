import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublic";

function useEmployee() {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: isEmployee, isPending: isEmployeeLoading } = useQuery({
      queryKey: [user?.email, "employee"],
      queryFn: async () => {
        const res = await axiosPublic.get(`/users/employee/${user.email}`);
        return res.data?.employee;
      },
    });
    return { isEmployee, isEmployeeLoading };
  }
  
  export default useEmployee;