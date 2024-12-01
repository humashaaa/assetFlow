import { HiOutlineUserRemove } from "react-icons/hi";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useUsers from "../../../Hooks/useUsers";
const EmployeeList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [users, refetch] = useUsers();

  const handleDelete = (emp) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${emp._id}/remove`).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Removed!",
              text: `${emp.name} is Removed from Your Team `,
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  const filter = users.filter(
    (emp) => emp.role === "employee" && emp.hrEmail === user.email
  );

  return (
    <div>
      <Helmet>
        <title>Employee List</title>
      </Helmet>
      <h1 className="font-bold text-3xl text-center mt-10">Employee List</h1>
      <h1 className="font-medium text-[15px] text-center mt-5 bg-blue-100 text-blue-700 p-3 w-44 mx-auto rounded-full ">
        Team Member - {filter.length}
      </h1>
      {/* employee list */}

      <div className="flex flex-col mx-auto mt-6 w-[44rem] ">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-xl font-lora font-bold text-left rtl:text-right "
                    >
                      <div className="flex items-center gap-x-3">
                        <span></span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-xl font-lora font-bold text-left rtl:text-right "
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Name</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 px-3 text-xl font-bold font-lora text-left rtl:text-right "
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Email</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-xl font-bold font-lora text-left rtl:text-right "
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Action</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white font-montserrat divide-y divide-gray-200 ">
                  {users
                    .filter(
                      (emp) =>
                        emp.role === "employee" && emp.hrEmail === user.email
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
                        <td className="px-3 py-3    whitespace-nowrap">
                          <div className="flex items-center gap-x-6">
                            {emp.isJoin === "true" && (
                              <button
                                title={`Remove ${emp.name}`}
                                onClick={() => handleDelete(emp)}
                                className="text-red-600 transition-colors duration-200 text-2xl ml-4   hover:text-red-500 focus:outline-none"
                              >
                                <HiOutlineUserRemove />
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

export default EmployeeList;
