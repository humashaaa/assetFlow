import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublic";

const useUserEmail = () => {
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic()
    const { data: userByEmail =[], isPending, refetch } = useQuery({
        queryKey: ["userByEmail", user?.email],
        queryFn: async () => {
          const res = await axiosPublic.get(`/user/${user.email}`);
          console.log(res.data);
    
          return res.data;
        },
      });
    return [userByEmail, refetch]
};

export default useUserEmail;