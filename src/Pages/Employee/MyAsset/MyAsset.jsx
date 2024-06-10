import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import {  useState } from "react";
import Modal from "react-modal";
import useAxiosSecure from "../../../useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const MyAsset = () => {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const axiosSecure = useAxiosSecure();
  //   console.log(user);
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
  const { data: assets = [] } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/asset/${loggedInUser.hrEmail}`);
      console.log(res.data);

      return res.data;
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-16">
        Request For an Asset
      </h1>

      {/* asset request */}

      <div className="flex flex-col mt-6 p-20">
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
                        <span>Product Name</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Product Type </span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span> Product Quantity</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    ></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
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
                            onClick={() => setVisible(true)}
                            className="btn bg-blue-300"
                          >
                            Request
                          </button>
                          <Modal
                            isOpen={visible}
                            onRequestClose={() => setVisible(false)}
                            style={{
                              content: {
                                width: "500px",
                                marginLeft: "500px",
                              },
                            }}
                          >
                           <div className="flex-col justify-between">
                           <div>
                              <h1>Additional Notes (if any) :</h1>
                              <input className="mt-5 w-full h-20 border-2" type="text" name="" id="" />
                            </div>
                            <button className="bg-blue-300 p-1 flex items-center mt-3 mx-auto" >
                              Request
                            </button>
                           </div>
                          </Modal>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAsset;
