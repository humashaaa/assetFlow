import { HiOutlineUserRemove } from "react-icons/hi";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
const EmployeeList = () => {
    const {user} = useAuth()
    const axiosSecure =  useAxiosSecure()


    const { data: employee = [], refetch } = useQuery({
        queryKey: ["employee", user?.email],
        queryFn: async () => {
          const res = await axiosSecure.get(`/users`);
          console.log(res.data);
    
          return res.data;
    
        },
    
      });

      const handleDelete = (emp) => {


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove!"
          }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/users/${emp._id}/remove`)
                .then(res =>{
                    console.log(res.data)
                    if(res.data.modifiedCount > 0){
                        refetch();
                        // setTeamCount(teamCount + 1);
                        Swal.fire({
                            title: "Removed!",
                            text: `${emp.name} is Removed from Your Team `,
                            icon: "success"
                          });
        
                       
                    }
                }) 


             
            }
          });

      
      };
    
     


    return (
        <div>
           <Helmet>
        <title>Employee List</title>
      </Helmet>
            <h1 className="font-bold text-3xl text-center mt-20">Employee List</h1>
            {/* employee list */}

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
                      <span>Remove </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  { employee.filter( emp =>emp.role === 'employee' && emp.hrEmail === user.email)
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
                         { emp.isJoin === 'true' && <button
                            onClick={() => handleDelete(emp)}
                            className="text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none"
                          >
                          <HiOutlineUserRemove />
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

export default EmployeeList;