
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../useAxiosPublic/useAxiosPublic';
import useAuth from './useAuth';
const useUsers = () => {
    const axiosPublic =  useAxiosPublic()
    const {user} = useAuth()
    const { data: users = [], isPending: usersLoading, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
          const res = await axiosPublic.get(`/users`);
          console.log(res.data);
    
          return res.data;
    
        },
    
      });
    return [users, usersLoading, refetch  ];
};

export default useUsers;