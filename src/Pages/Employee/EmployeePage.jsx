import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import useAxiosSecure from "../../useAxiosSecure/useAxiosSecure";

import { Helmet } from "react-helmet-async";
import img from "../../assets/employeeBanner.png";
import { axiosPublic } from "../../useAxiosPublic/useAxiosPublic";
const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
const EmployeePage = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { createUser, updateUser, googleSignIn } = useAuth();
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  // console.log(role);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password, name, birthDate, photo } = data;
    console.log(data);
    createUser(email, password).then(async (result) => {
      if (result.user) {
        setUser({ ...user, photoURL: photo, displayName: name });

        updateUser(name, photo).then(async () => {
          // user set on the database

          console.log(data);

          const employeeData = {
            email,
            password,
            name,
            photo,
            birthDate,
            role: "employee",
            isJoin: "false",
          };

          await axios
            .post(`${import.meta.env.VITE_URL}/users`, employeeData)
            .then((res) => {
              if (res.data.insertedId) {
                console.log("employee added");
                toast.success("employee info updated");
                navigate("/dashboard");
              }
            });
        });
      }

      console.log(result);
    });
  };

  const validation = (value) => {
    if (!value) return "this field is required";
    if (value.length < 6) return "Password must be at least 6 characters long";
    if (!/[A-Z]/.test(value))
      return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(value))
      return "Password must contain at least one lowercase letter";
    return true;
  };

  const handleSocialLogin = () => {
    googleSignIn().then((result) => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        role: "employee",
      };
      axiosSecure.post(`/users`, userInfo).then((res) => {
        console.log(res.data);
        navigate("/dashboard");
        toast.success("Sign in Successfully");
      });
    });
  };


  return (
    <div>
      <Helmet>
        <title>Join as Employee</title>
      </Helmet>
      <div className=" ">
        <div className="relative">
          <img className="h-full" src={img} alt="" />
        </div>
        <div className="absolute top-32 right-20 flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-[31rem]  shadow-2xl bg-base-100">
            <h1 className="text-center text-2xl font-bold mt-10 mb-3">
              Join As Employee
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="flex items-center justify-between gap-2 " >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="full name"
                  className="input w-48 focus:outline-none input-bordered"
                  required
                />
                {errors.name && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="email"
                  className="input focus:outline-none input-bordered"
                  required
                />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              </div>

              {/* 2nd row */}
              <div className="flex items-center justify-between ">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Date of Birth</span>
                  </label>
                  <input
                    type="date"
                    {...register("birthDate", { required: true })}
                    placeholder="date of birth"
                    className="input w-48 focus:outline-none input-bordered"
                    required
                  />
                  {errors.birthDate && (
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
                    {...register("password", { validate: validation })}
                    type="password"
                    placeholder="password"
                    className="input focus:outline-none input-bordered"
                    required
                  />
                  {errors.password && (
                    <span className="text-sm text-red-500">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    {...register("photo")}
                    type="text"
                    placeholder="Your Photo URL"
                    className="input input-bordered"
                  />
                </div>

              <input
                className="btn mt-5 btn-primary bg-blue-500 hover:bg-blue-600 border-none text-white text-xl"
                type="submit"
                value="Sign Up!"
              />
            </form>
            <hr />
            {/* socials */}
            <div className="mb-6 mt-7  mx-auto">
              <button
                onClick={handleSocialLogin}
                className="inline-flex  cursor-pointer items-center justify-center whitespace-nowrap rounded-md  border border-blue-600 border-input   h-12  w-[27rem]"
                type="submit"
              >
                <span className="mr-2">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 48 48"
                    className="h-5 w-5"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                </span>
                <span className="font-semibold text-xl">Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
