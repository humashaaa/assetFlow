import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log(user, loading);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-24">
        <p className="w-32 ">
        <span className="loading loading-bars loading-lg"></span>
        </p>
      </div>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname}></Navigate>;
};

export default PrivateRoute;
