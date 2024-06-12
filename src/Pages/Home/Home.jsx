import { Helmet } from "react-helmet-async";
import About from "./About";
import Package from "./Package";
import Slidder from "./Slidder";
import EmployeeHome from "./EmployeeHome";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Home = () => {



    // for employee
    const { user, logOut } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isPending } = useQuery({
        queryKey: ["user", user?.email],
        queryFn: async () => {
          const res = await axiosSecure.get(`/user/${user.email}`);
          console.log(res.data);
    
          return res.data;
        },
      });
      console.log(users);
      const loggedInUser = users[0];
      console.log(loggedInUser);
  
      const { data: assets = [], refetch } = useQuery({
          queryKey: ["assets"],
          queryFn: async () => {
            const res = await axiosSecure.get(
              `/asset/requestAsset/${loggedInUser.hrEmail}`
            );
            console.log(res.data);
      
            return res.data;
          },
        });
      
        console.log(assets);






    return (
        <div>

            <div className=" w-full mt-6">
            <Slidder></Slidder>

            </div>
            <div className="mt-36 text-center ">
                <About></About>
            </div>
            <div className="text-center mt-32 mb-20">
                <Package></Package>
            </div>

            {/* {
                loggedInUser?  <EmployeeHome assets={assets}></EmployeeHome> :
               <>
                
               </>
            } */}


        </div>
    );
};

export default Home;