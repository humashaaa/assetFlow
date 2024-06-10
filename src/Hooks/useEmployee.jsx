// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
// import useAuth from "./useAuth";

// const useEmployee = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();
//     const { data: isEmployee, isPending: isEmployeeLoading } = useQuery({
//         queryKey: [user?.email, 'isEmployee'],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users/employee/${user.email}`);
//             console.log(res.data);
//             return res.data?.employee;
//         }
//     })
//     return [isEmployee, isEmployeeLoading]
// };

// export default useEmployee;