import axios from "axios";


export const axiosPublic = axios.create({
    baseURL : 'https://assetflow-server-eta.vercel.app' 
  })
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;