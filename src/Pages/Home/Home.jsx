import { Helmet } from "react-helmet-async";
import About from "./About";
import Package from "./Package";
import Slidder from "../../Component/Slidder";
import EmployeeHome from "./EmployeeHome";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useHr from "../../Hooks/useHr";
import useEmployee from "../../Hooks/useEmployee";
import useUserData from "../../Hooks/useUserData";
import Features from "./Features";
import TestimonialSlider from "./TestimonialSlider";
import Countup from "./CountUp/Countup";

const Home = () => {
  // for employee
  // const { user, logOut } = useAuth();
  // const axiosSecure = useAxiosSecure();
  // const [isHr] = useHr();


  // const { data: users = [], isLoading } = useQuery({
  //   queryKey: ["user", user?.email],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/user/${user.email}`);
  //     console.log(res.data);

  //     return res.data;
      
  //   },

    
  // });

 
  // console.log(users);
  // const loggedInUser = users[0];
  // const [userData] = users;
  // console.log(loggedInUser);

  // const { data: assets = [], refetch } = useQuery({
  //   queryKey: ["assets"],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(
  //       `/asset/requestAsset/${loggedInUser.hrEmail}`
  //     );
  //     console.log(res.data);

  //     return res.data;
  //   },
  // });

  // console.log(assets);

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-[60vh]">
  //       <span className="loading loading-bars loading-lg"></span>
  //     </div>
  //   );
  // }

  return (
    <div>
     
          <div className=" w-full mt-6">
            <Slidder></Slidder>
          </div>
          <div className="mt-36 text-center ">
            <About></About>
          </div>
          <div className="mt-36 text-center ">
            <Countup></Countup>
          </div>
          <div className="mt-36 text-center ">
            <Features></Features>
          </div>
          <div className="text-center mt-32 mb-20">
            <Package></Package>
          </div>
          <div className="text-center mt-32 mb-20">
            <TestimonialSlider></TestimonialSlider>
          </div>

      {/* {isHr && (
        <>
          <p className="font-extrabold text-4xl text-center">HR</p>
          <PendingRequestsInHome />
          <TopRequestedItems />
          <LimitedStock />
          <HRChart />
          <ExtraSections />
        </>
      )} */}

    </div>
  );
};

export default Home;
