// import axios from "axios";
// import useAuth from "../Hooks/useAuth";
// import { useNavigate } from "react-router-dom";

// export const axiosSecure = axios.create({
//   baseURL: "http://localhost:5000",
// });
// const useAxiosSecure = () => {
//   const navigate = useNavigate();
//   const { logOut } = useAuth();
//   axiosSecure.interceptors.request.use(
//     function (config) {
//       const token = localStorage.getItem("access-token");
//       // console.log('request stopped by interceptor', token);
//       config.headers.authorization = `Bearer ${token}`;
//       return config;
//     },
//     function (error) {
//       return Promise.reject(error);
//     }
//   );

//   // interceptors 401 and 403 status

//   axiosSecure.interceptors.response.use(
//     function (response) {
//       return response;
//     },
//     async (error) => {
//       const status = error.response.status;
//       // console.log('status error in the interceptor', status);
//       if (status === 401 || status === 403) {
//         await logOut();
//         navigate("/login");
//       }
//       return Promise.reject(error);
//     }
//   );
 
//   return axiosSecure;
// };

// export default useAxiosSecure;

import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

export const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      function (config) {
        const token = localStorage.getItem("access-token");
        config.headers.authorization = `Bearer ${token}`;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      function (response) {
        return response;
      },
      async (error) => {
        const status = error.response ? error.response.status : null;
        if (status === 401 || status === 403) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    // Cleanup function to eject the interceptors
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate, logOut]);

  return axiosSecure;
};

export default useAxiosSecure;

