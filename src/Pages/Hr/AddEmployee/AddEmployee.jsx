import { useQuery } from "@tanstack/react-query";
import { IoPersonAdd } from "react-icons/io5";
import useAxiosSecure from "../../../useAxiosSecure/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
const AddEmployee = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState('');
  const navigate = useNavigate()

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
const [userData] = userss
// let newLimit = userData.limit

  const handleAdd = (emp) => {

    axiosSecure.patch(`/users/${emp._id}`, loggedInUser)
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
              setLimit(newLimit - 1)
              refetch()
        }
    }) 
    console.log(newLimit);
  };
  

  const filter = employee.filter(emp =>emp.role === 'employee' && emp.hrEmail === user.email)  
const handleSubmit = async e =>{
  e.preventDefault()
  const price = e.target.price.value

  const increaseData = {
    price : parseInt(price),
    // additionalLimit: price === 5?  5 : price === 8?  20
  }



}
  return (
    <div >

<Helmet>
        <title>Add Employee</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center mt-20">Add Employee</h1>
      
      {/* add employee */}
<div className="flex justify-around items-center">
<h1 className="bg-blue-400 px-2 text-white rounded-full w-36 mx-auto mt-16">Total member {filter.length}</h1>
{/* <h1 className="bg-blue-400 px-2 text-white rounded-full w-36 mx-auto mt-16">Package Limit {newLimit}</h1> */}
{/* <Link to='/increaseForm' className="bg-blue-400 px-2 text-white rounded-full w-36 mx-auto mt-16">Increase Limit</Link> */}
<form onSubmit={handleSubmit}>
<div className="form-control ">
                <label for="price">Select Package</label>
                <select
                  className="border-2 p-2 rounded-xl"
                  id="price"
                  name="package"

                >
                  <option value="5">5 Members for $5</option>
                  <option value="8">10 Members for $8</option>
                  <option value="15">20 Members for $15</option>
                </select>
                
              </div>
              <button className="btn">Increase package</button>
</form>

  </div>      

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
