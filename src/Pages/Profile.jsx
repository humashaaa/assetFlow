import { Helmet } from "react-helmet-async";
import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, loading, updateProfile } = useAuth() || {};
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading , refetch} = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      console.log(res.data);

      return res.data;
    },
  });

  console.log(user);
  if (isLoading || loading)
    return <span className="loading loading-spinner loading-lg"></span>;


  const handleSubmit = async(e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value
    const updatedUser = {name, photo}


    try {
      const { data } = await axiosSecure.patch(
        `/user/${user.email}`,
        updatedUser
      )
      console.log(data)
      refetch()
      toast.success('user Updated Successfully!')
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
  }




  return (
    <div className="flex justify-center items-center h-screen">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-2xl w-3/5">
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={users[0].photo}
              className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
            />
          </a>

          <p className="p-2 uppercase px-4 text-xs text-white bg-blue-500 rounded-full">
            {users[0].role}
          </p>
          <p className="mt-2 text-xl font-medium text-gray-800 ">
            User Id: {user?.uid}
          </p>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-black ">
                  {users[0].name}
                </span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-black ">{user?.email}</span>
              </p>

              <div>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Display Name:</label>
                    <input className="border-2"
                      type="text"
                      name="name"
                    />
                  </div>
                  <div>
                    <label>Photo URL:</label>
                    <input
                    className="border-2"
                      type="text"
                      name="photo"
                    />
                  </div>
                  <button className="bg-blue-500 rounded-xl mt-4 p-2 text-white" type="submit">Update Profile</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
