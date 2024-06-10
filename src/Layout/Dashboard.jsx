import { NavLink, Outlet } from "react-router-dom";
import useHr from "../Hooks/useHr";

const Dashboard = () => {
  const [isHr] = useHr()
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-blue-100">
        <ul className="menu">
          {isHr ? (
            <>
              <li>
                <NavLink to="/dashboard/assetList">Asset List</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addAsset">Add Asset</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allRequest">All Request</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/employeeList">Employee List</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addEmployee">Add Employee</NavLink>
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

          {/* shared links */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
