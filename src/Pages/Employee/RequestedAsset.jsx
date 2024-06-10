import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const RequestedAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()





  const { data: users = [], isPending } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      console.log(res.data);

      return res.data;
    },
  });
  console.log(users[0]);
  const loggedInUser = users[0];
  // assets
  const { data: assets = [], refetch } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/asset/${loggedInUser.hrEmail}`);
      console.log(res.data);

      return res.data;
    },
  });

console.log(assets);





  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-16">My Asset</h1>
      {/* search */}
      <div className=" mt-11 flex item-center justify-around">
     



       

{/* asset request */}

<div className="flex flex-col mt-6 p-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Asset Name</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Asset Type </span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Request Date</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Approval Date</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Request Status</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    ></th>
                  </tr>
                </thead>
                {/* <tbody className="bg-white divide-y divide-gray-200 ">
                  {assets.map((asset) => (
                    <tr key={asset._id}>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {asset.productName}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {asset.productType}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {asset.productQuantity}
                      </td>

                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <button
                            onClick={() => {
                            
                            }}
                            className="btn bg-blue-300"
                          >
                            Request
                          </button>
                         
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody> */}
              </table>
            </div>
          </div>
        </div>
      </div>


      </div>
    </div>
  );
};

export default RequestedAsset;
