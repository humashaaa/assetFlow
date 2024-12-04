import { useQuery } from "@tanstack/react-query";
import { IoPersonAdd } from "react-icons/io5";
import useAxiosSecure from "../../../useAxiosSecure/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import useUsers from "../../../Hooks/useUsers";
import useUserEmail from "../../../Hooks/useUserEmail";
const AddEmployee = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const { data: employee = [], refetch } = useQuery({
    queryKey: ["employee"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      console.log(res.data);

      return res.data;
    },
  });
  const { data: userss = [], isPending } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      console.log(res.data);

      return res.data;
    },
  });
  console.log(userss[0]);
  const loggedInUser = userss[0];
  // console.log(employees);
  // console.log(user.companyName);
  const [userData] = userss;
  // let newLimit = userData.limit

  const handleAdd = (emp) => {
    axiosSecure.patch(`/users/${emp._id}`, loggedInUser).then((res) => {
      // console.log(res.data)
      if (res.data.modifiedCount > 0) {
        refetch();
        // setTeamCount(teamCount + 1);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${emp.name} is in Your Team Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  const filter = employee.filter(
    (emp) => emp.role === "employee" && emp.hrEmail === user.email
  );

  return (
    <div>
      <Helmet>
        <title>Add Employee</title>
      </Helmet>

      <h1 className="font-bold text-3xl text-center mt-10"> Add Employee </h1>
      <h1 className="font-medium text-[15px] text-center mt-5 bg-blue-100 text-blue-700 p-3 w-44 mx-auto rounded-full ">
        Total Member - {filter.length}
      </h1>

      <div className="flex flex-col mx-auto mt-6 w-[44rem] ">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full  py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border  border-gray-200  md:rounded-lg">
              <table className="min-w-full  divide-y divide-gray-200">
                <thead className="bg-gray-50 w-[44rem]">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-xl font-bold font-lora text-left rtl:text-right"
                    >
                      <div className="flex items-center gap-x-3">
                        <span></span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 px-4 text-xl font-bold font-lora text-left rtl:text-right"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Name</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 px-4 text-xl font-bold font-lora text-left rtl:text-right"
                    >
                      <span>Email </span>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-xl font-bold font-lora text-left rtl:text-right"
                    >
                      <span>Action </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {employee
                    .filter(
                      (emp) => emp.role === "employee" && emp.isJoin === "false"
                    )
                    .map((emp) => (
                      <tr key={emp._id}>
                        <td className="px-3 py-4 text-sm text-gray-800  whitespace-nowrap capitalize">
                          <img
                            className="h-10 w-10 rounded-2xl"
                            src={emp?.photo}
                          />
                        </td>

                        <td className="px-3 py-4  text-gray-600  whitespace-nowrap">
                          {emp.name}
                        </td>
                        <td className="px-4 py-4  text-gray-600  whitespace-nowrap">
                          {emp.email}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-6">
                            {emp.isJoin === "true" ? (
                              "Team Member"
                            ) : (
                              <button
                                onClick={() => handleAdd(emp)}
                                className="text-green-500 transition-colors duration-200 text-2xl ml-4   hover:text-green-400 focus:outline-none"
                              >
                                <IoPersonAdd />
                              </button>
                            )}
                          </div>
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

export default AddEmployee;
