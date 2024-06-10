import { useQuery } from "@tanstack/react-query";
import { IoPersonAdd } from "react-icons/io5";
import useAxiosSecure from "../../../useAxiosSecure/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
const AddEmployee = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
const localtion = useLocation()
  const [users, setUsers] = useState([]);
  const [teamCount, setTeamCount] = useState(0);

  const { data: employee = [], refetch } = useQuery({
    queryKey: ["employee"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      console.log(res.data);

      return res.data;

    },

  });


  const handleAdd = (emp) => {

    axiosSecure.patch(`/users/${emp._id}`, user)
    .then(res =>{
        // console.log(res.data)
        if(res.data.modifiedCount > 0){
            refetch();
            // setTeamCount(teamCount + 1);

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${emp.name} is in Your Team Now!`,
                showConfirmButton: false,
                timer: 1500
              });
        }
    }) 
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center mt-20">Add Employee</h1>
      {/* add employee */}
      <h1 className="bg-blue-300 px-2 text-white rounded-full w-36 mx-auto mt-16">Total member {teamCount}</h1>

      <div className="flex flex-col mt-6 px-40 ">
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

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Add </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  { employee.filter( emp =>emp.role === 'employee' && emp.isJoin ==='false')
                  .map((emp) => (
                    <tr key={emp._id}>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                      <img className="h-10 w-10 rounded-2xl" src={emp?.photo} />
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {emp.name}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                         { emp.isJoin === 'true'? 'Team Member' : <button
                            onClick={() => handleAdd(emp)}
                            className="text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none"
                          >
                          <IoPersonAdd />
                          </button>}
                         
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
