
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../useAxiosSecure/useAxiosSecure";
const Login = () => {
  const axiosSecure = useAxiosSecure()
  const {  user, 
    loading,
    signIn,
    googleSignIn,
    createUser,
    logOut } = useAuth();
  const navigate = useNavigate();
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    console.log(data);



    signIn(email, password)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        navigate("/");
        toast.success('Sign in Successfully')
      

        const user = { email };
        console.log(user);

      })
      .catch((error) => {
                toast.error(error?.message)

        console.log(error);
      });
  };

  useEffect(() => {
    if (user) {
      navigate(location.state);
    }
  }, [user]);

  const handleSocialLogin = () => {
    googleSignIn()
    .then((result) => {
      console.log(result.user);
      const userInfo = {
        email : result.user?.email,
        name: result.user?.displayName
      }
      axiosSecure.post(`/users`, userInfo)
      .then(res=>{
        console.log(res.data);
        navigate("/");
      toast.success("Sign in Successfully");
      })
    



    });
  };
 

  return (
    <div className="flex items-center flex-row-reverse justify-center mt-16 mb-16">
      <div className="flex justify-center ">
        <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800 ">
          <h2 className="mb-3 text-3xl font-semibold text-center">
            Login to your account
          </h2>
          <p className="text-sm text-center dark:text-gray-600">
            Dont have account?
            <Link className="text-blue-500 underline" to="/register">
              Sign up
            </Link>
          </p>
          {/* socials */}
          <div className="my-6 space-y-4">
            <button
              onClick={handleSocialLogin}
              aria-label="Login with Google"
              type="button"
              className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
              <p>Login with Google</p>
            </button>
          </div>

          <div className="flex items-center w-full my-4">
            <hr className="w-full dark:text-gray-600" />
            <p className="px-3 dark:text-gray-600">OR</p>
            <hr className="w-full dark:text-gray-600" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="password"
                className="input input-bordered"
              />
              {errors.password && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary bg-blue-400 hover:bg-blue-500 border-none text-white text-xl">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default Login;