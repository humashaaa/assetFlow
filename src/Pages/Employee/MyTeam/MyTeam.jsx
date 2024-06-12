import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../useAxiosSecure/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const MyTeam = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
//   console.log(user);
  const { data: users =[], isPending } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      console.log(res.data);

      return res.data;
    },
  });
  console.log(users[0]);
  const loggedInUser = users[0]

  const { data: employee = [], refetch } = useQuery({
    queryKey: ["employee"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      console.log(res.data);

      return res.data;
    },
  });

  console.log(employee);

  return (
    <div>
       <Helmet>
        <title>My Team</title>
      </Helmet>
      <h1 className="font-bold text-center text-3xl mt-20">My Team</h1>

      {/* my team */}

      <div className="flex flex-col mt-6 px-60 ">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span></span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Name</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  { employee.filter( emp =>emp.hrEmail === loggedInUser.hrEmail || emp.email === loggedInUser.hrEmail)
                  .map((emp) => (
                    <tr key={emp._id}>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                      <img className="h-10 w-10 rounded-2xl" src={emp?.photo} />
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {emp.name}
                      </td>
                     
                    </tr>
                  ))}
                 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTeam;
