import { SiTicktick } from "react-icons/si";
import Header from "../../Component/ReusableComponent/Header";
import img from "../../assets/aboutBanner.png";
import feature1 from "../../assets/solution.png";
import feature2 from "../../assets/growth.png";
import feature3 from "../../assets/customer-relationship-management.png";
const About = () => {
  return (
    <div className="space-y-8 m-16">
      <Header
        title={"Effortless Asset Management"}
        subtitle={
          "Revolutionizing the Way Businesses Manage, Track, and Optimize Their Assets for a More Efficient Future"
        }
      ></Header>

      <div className="flex items-end justify-center px-20 mt-24 pt-24  gap-6">
        {/* together success */}
        {/* <div className="flex flex-col items-start justify-start space-y-4">
          <h1 className="font-bold text-2xl">Together success in future</h1>

          <p className="text-start w-4/5">
            Welcome to AssetFlow, the ultimate solution for businesses aiming to
            efficiently manage their assets and products. We understand the
            challenges HR Managers face in tracking and optimizing the use of
            company assets. Our software is designed to management asset,
            ensuring that your resources are utilized effectively.
          </p>
          <ul className="flex flex-col gap-2 items-start">
            <li className="flex items-center justify-center gap-3">
              <span className="text-blue-600">
                <SiTicktick />
              </span>
              Easily monitor and organize both returnable and non-returnable
              assets.
            </li>
            <li className="flex items-center justify-center gap-3">
              <span className="text-blue-600">
                <SiTicktick />
              </span>
              Optimize the use of company resources to boost efficiency and
              reduce waste.
            </li>
            <li className="flex items-center justify-center gap-3">
              <span className="text-blue-600">
                <SiTicktick />
              </span>
              Promote responsibility with clear asset assignment and return
              policies.
            </li>
          </ul>
        </div> */}

        {/* who are we  */}
        <div>
          <div className="flex flex-col items-start justify-start space-y-4">
            <h1 className="font-bold text-3xl">Who Are We</h1>
            <p className="text-start w-4/5">
              Our mission at AssetFlow is to simplify asset tracking and
              management for businesses of all sizes. We aim to provide a
              comprehensive, user-friendly platform that helps HR Managers
              monitor the use of both returnable and non-returnable assets,
              promoting accountability and efficiency within the organization.
            </p>
          </div>

          {/* cards */}
          <div className="flex gap-4  mt-7">
            {/* 1 */}
            <div className="flex items-center justify-center flex-col w-44 py-3 space-y-2 border-4 border-gray-300 hover:border-blue-900">
              <img className="w-16 h-16" src={feature1} alt="" />
              <h1 className="font-semibold">High-Impact Asset Allocations</h1>
            </div>
            {/* 2 */}
            <div className="flex items-center justify-center flex-col w-44 py-3 space-y-2 border-4 border-gray-300 hover:border-blue-900">
              <img className="w-16 h-16" src={feature2} alt="" />
              <h1 className="font-semibold">Proven Investment Growth</h1>
            </div>

            {/* 3 */}
            <div className="flex items-center justify-center flex-col w-44 py-3 space-y-2 border-4 border-gray-300 hover:border-blue-900">
              <img className="w-16 h-16" src={feature3} alt="" />
              <h1 className="font-semibold">Optimized Asset Solutions</h1>
            </div>
          </div>
        </div>

        {/* image */}
        <div>
            <img className="w-[96rem]" src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default About;
