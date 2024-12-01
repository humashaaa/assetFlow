import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useHr from "../Hooks/useHr";
import { FaClipboardList } from "react-icons/fa";
import { MdAddToPhotos } from "react-icons/md";
import { FaWallet } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import { IoPersonAddSharp } from "react-icons/io5";
import { RiLogoutBoxRFill } from "react-icons/ri";
import useAuth from "../Hooks/useAuth";
const Dashboard = () => {
  const [isHr] = useHr();
  const navigate = useNavigate()
  const {user, logOut} = useAuth()
  const handleLogOut =()=>{
    logOut()
    navigate('/')
    
  }
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-[#030C0D] pb-12 flex flex-col items-center justify-between">
        <ul className=" text-white mt-9 text-xl space-y-4 font-semibold">
          <li>
            <NavLink to="/" className="font-bold text-4xl mb-20">
              Asset<span className="text-blue-500 ">Flow</span>
            </NavLink>
          </li>
          {isHr ? (
            <>
              <li>
                <NavLink
                  to="/dashboard/assetList"
                  className={({ isActive }) =>
                    isActive
                      ? "flex text-blue-500 items-center justify-start mt-8 gap-1"
                      : "flex items-center justify-start mt-8 gap-1"
                  }
                >
                 
                  <FaClipboardList /> Asset List
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/addAsset"
                  className={({ isActive }) =>
                    isActive
                      ? "flex text-blue-500 items-center justify-start mt-8 gap-1"
                      : "flex items-center justify-start mt-8 gap-1"
                  }
                >
                  {" "}
                  <MdAddToPhotos /> Add Asset
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/allRequest"
                   className={({ isActive }) =>
                    isActive
                      ? "flex text-blue-500 items-center justify-start mt-8 gap-1"
                      : "flex items-center justify-start mt-8 gap-1"
                  }
                >
                  <FaWallet /> All Request
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/employeeList"
                   className={({ isActive }) =>
                    isActive
                      ? "flex text-blue-500 items-center justify-start mt-8 gap-1"
                      : "flex items-center justify-start mt-8 gap-1"
                  }
                >
                  <IoPeople /> Employee List
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/addEmployee"
                   className={({ isActive }) =>
                    isActive
                      ? "flex text-blue-500 items-center justify-start mt-8 gap-1"
                      : "flex items-center justify-start mt-8 gap-1"
                  }
                >
                  <IoPersonAddSharp /> Add Employee
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/myAsset">My Asset</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/team">My Team</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/requestAsset">Request an Asset</NavLink>
              </li>
            </>
          )}
        </ul>
        <div className=" -ml-24">
          <button onClick={handleLogOut} className="text-white flex items-center justify-start hover:text-blue-500 gap-1 text-xl font-semibold">
            <RiLogoutBoxRFill /> Logout
          </button>
        </div>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
