import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
const Nav = () => {
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


  const navbar = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-red-500 text-xl font-bold"
            : "font-bold text-xl text-blue-500"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive
            ? "text-red-500 text-xl font-bold"
            : "font-bold text-xl text-blue-500"
        }
      >
       Contact
      </NavLink>

      <NavLink
        to="/employee"
        className={({ isActive }) =>
          isActive
            ? "text-red-500 text-xl font-bold"
            : "font-bold text-xl  text-blue-500"
        }
      >
        Join as Employee
      </NavLink>
      <NavLink
        to="/HRmanager"
        className={({ isActive }) =>
          isActive
            ? "text-red-500 text-xl font-bold"
            : "font-bold text-xl  text-blue-500"
        }
      >
        Join as HR Manager
      </NavLink>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 flex items-start justify-around"
            >
              {user ? <><p>AssetFlow</p></> : [navbar]}
            </ul>
          </div>
          {/* <a className="btn btn-ghost text-2xl font-extrabold">assetflow</a> */}
          <a className="btn btn-ghost text-2xl font-extrabold"> {loggedInUser ? loggedInUser.companyName : 'AssetFlow'}</a>
        
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal px-1 flex items-center gap-10">
            {user ? <></> : [navbar]}
          </ul>
        </div>
        <div className="navbar-end">
          {loggedInUser ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-11 rounded-full">
                  <img src={loggedInUser.photo} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm  dropdown-content mt-3 z-[50] p-2 shadow bg-blue-50 rounded-box md:w-52 w-20"
              >
                <li>
                  <button className="btn btn-sm font-extrabold mb-1  btn-ghost">
                    {loggedInUser.name || "user name not found"}
                  </button>
                </li>
                <li>
                  <NavLink className="font-semibold" to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink className="font-semibold mb-3" to="/myProfile">
                    Profile
                  </NavLink>
                </li>

                <li>
                  <button
                    onClick={logOut}
                    className="btn btn-sm hover:bg-blue-500  bg-blue-400 text-white"
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              className="bg-blue-400 md:w-28 w-15 h-10 text-xl btn hover:bg-blue-500 rounded-2xl  text-white font-bold"
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
