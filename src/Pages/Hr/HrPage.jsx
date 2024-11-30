import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { axiosSecure } from "../../useAxiosSecure/useAxiosSecure";
import CheckoutForm from "./Payment/CheckoutForm";
import { Helmet } from "react-helmet-async";
import img from "../../assets/HRbanner.png";
const HrPage = () => {
  const navigate = useNavigate();
  const { createUser, updateUser, googleSignIn } = useAuth();
  const [user, setUser] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password, name, photo, price, birthDate, companyName } =
      data;
    console.log(data);
    createUser(email, password).then(async (result) => {
      if (result.user) {
        setUser({ ...user, photoURL: photo, displayName: name });

        updateUser(name, photo).then(async () => {
          // user set on the database

          console.log(data);

          const hrData = {
            email,
            password,
            name,
            photo,
            price: parseInt(price),
            birthDate,
            companyName,
            role: "hr",
            limit: price === 5 ? 5 : price === 8 ? 10 : 20,
          };
          console.log(hrData.limit);

          await axios
            .post(`${import.meta.env.VITE_URL}/users`, hrData)
            .then((res) => {
              if (res.data.insertedId) {
                console.log("hrManager added");
                // toast.success("sign in successfully");
                navigate("/payment", { state: { price: price } });
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

        role: "hr",
      };
      axiosSecure.post(`/users`, userInfo).then((res) => {
        console.log(res.data);
        navigate("/payment");
        // toast.success("Sign in Successfully");
      });
    });
  };

  return (
    <div>
      <Helmet>
        <title>Join as HR Manager</title>
      </Helmet>
      <div className="relative">
        <div>
          <img className="min-h-screen" src={img} alt="" />
        </div>

        <div className=" min-h-screen absolute top-4 right-4 ">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card shrink-0 w-[34rem]  shadow-2xl bg-base-100">
              <h1 className="text-center text-2xl font-bold mt-10">
                Join As HR Manager
              </h1>
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="flex item-center justify-between">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      placeholder="full name"
                      className="input input-bordered"
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
                      <span className="label-text">Company Name</span>
                    </label>
                    <input
                      type="text"
                      {...register("companyName", { required: true })}
                      placeholder="company name"
                      className="input input-bordered"
                      required
                    />
                    {errors.companyName && (
                      <span className="text-sm text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>

                {/* 2nd row */}
                <div className=" flex justify-between gap-3">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      {...register("email", { required: true })}
                      placeholder="Email"
                      className="input input-bordered"
                      required
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
                      {...register("password", { validate: validation })}
                      type="password"
                      placeholder="password"
                      className="input input-bordered"
                      required
                    />
                    {errors.password && (
                      <span className="text-sm text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>

                {/* 3rd row */}
                <div className=" flex justify-between">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Date of Birth</span>
                    </label>
                    <input
                      type="date"
                      {...register("birthDate", { required: true })}
                      placeholder="date of birth"
                      className="input input-bordered"
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
                      <span className="label-text">Company Logo URL</span>
                    </label>
                    <input
                      {...register("photo")}
                      type="text"
                      placeholder="company logo"
                      className="input input-bordered"
                    />
                  </div>
                </div>

                <div className="form-control ">
                  <label for="price">Select Package</label>
                  <select
                    className="border-2 p-2 rounded-xl"
                    id="price"
                    {...register("price", { required: true })}
                  >
                    <option value="5">5 Members for $5</option>
                    <option value="8">10 Members for $8</option>
                    <option value="15">20 Members for $15</option>
                  </select>
                  {errors.price && (
                    <span className="text-sm text-red-500">
                      This field is required
                    </span>
                  )}
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
    </div>
  );
};

export default HrPage;
