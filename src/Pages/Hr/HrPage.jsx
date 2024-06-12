import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { axiosSecure } from "../../useAxiosSecure/useAxiosSecure";
import CheckoutForm from "./Payment/CheckoutForm";
import { Helmet } from "react-helmet-async";

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
    const { email, password, name, photo, price, birthDate, companyName } = data;
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
            limit: price === 5?  5 : price === 8?  10 : 20
          };
          console.log(hrData.price);

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
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full  shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="flex gap-4">
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
              <div className=" flex justify-between">
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
                className="btn btn-primary bg-blue-400 hover:bg-blue-500 border-none text-white text-xl"
                type="submit"
                value="Sign Up!"
              />
            </form>

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrPage;
