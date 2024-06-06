import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
const Nav = () => {
  const {user, logOut} = useAuth()

  const navbar = <>
  <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-red-500 text-xl font-bold" : "font-bold text-xl text-blue-500"
            }
          >
            Home
          </NavLink>
          
          <NavLink to="/employee"className={({ isActive }) =>
              isActive ? "text-red-500 text-xl font-bold" : "font-bold text-xl  text-blue-500"
            }>Join as Employee</NavLink>
          <NavLink to="/HRmanager"className={({ isActive }) =>
              isActive ? "text-red-500 text-xl font-bold" : "font-bold text-xl  text-blue-500"
            }>Join as HR Manager</NavLink>
          <NavLink to="/payment"className={({ isActive }) =>
              isActive ? "text-red-500 text-xl font-bold" : "font-bold text-xl  text-blue-500"
            }>payment</NavLink>
          


          
           {/* {
            user && isAdmin && <li><NavLink to='/dashboard/adminHome'>Admin Home</NavLink></li>
           }
           {
            user && !isAdmin && <li><NavLink to='/dashboard/userHome'>User Home</NavLink></li>
           } */}
  </>


    return (
        <div>
           <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 flex items-start justify-around">
       {navbar}      
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">AssetFlow</a>
  </div>
  <div className="navbar-center hidden lg:flex ">
    <ul className="menu menu-horizontal px-1 flex items-center gap-10">
    {navbar}      
    </ul>
  </div>
  <div className="navbar-end">
  {
    user? <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-11 rounded-full">
                <img src={user?.photoURL } />
            </div>
        </label>
        <ul tabIndex={0} className="menu menu-sm  dropdown-content mt-3 z-[50] p-2 shadow bg-blue-50 rounded-box md:w-52 w-20">
            <li>
                <button className="btn btn-sm font-extrabold mb-1  btn-ghost">{user?.displayName||'user name not found'}</button>

            </li>
           {/* <div className="space-y-1 mb-2 flex flex-col">
           <NavLink to='/myJobs' className={({ isActive }) =>
              isActive ? "text-blue-500  font-bold" : "font-bold "
            }>My Jobs</NavLink>
            <NavLink to='/addJobs' className={({ isActive }) =>
              isActive ? "text-blue-500  font-bold" : "font-bold "
            }>Add A Job</NavLink>
            <NavLink to='/appliedJobs' className={({ isActive }) =>
              isActive ? "text-blue-500  font-bold" : "font-bold "
            }>Applied Jobs</NavLink>
            <NavLink to='/jobRequest' className={({ isActive }) =>
              isActive ? "text-blue-500  font-bold" : "font-bold "
            }>Job Request</NavLink>
           </div> */}
            
            <li>
                <button
                    onClick={logOut}
                    className="btn btn-sm hover:bg-blue-500  bg-blue-400 text-white">Log out</button>

            </li>
        </ul>
    </div>
        :

         <Link
          className="bg-blue-400 md:w-28 w-15 h-10 text-xl btn hover:bg-blue-500 rounded-2xl  text-white font-bold"
          to="/login"
        >
          Login
        </Link> 


}  </div>
</div> 
        </div>
    );
};

export default Nav;