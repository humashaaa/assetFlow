import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiDownload } from "react-icons/fi";
import { Button } from "@headlessui/react";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbTruckReturn } from "react-icons/tb";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
// import Action from "./Action";
const RequestedAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

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
      const res = await axiosSecure.get(
        `/asset/requestAsset/${loggedInUser.hrEmail}`
      );
      console.log(res.data);

      return res.data;
    },
  });

  console.log(assets);

  const handleDelete = (asset) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/assets/cancel/${asset._id}`).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
            // setTeamCount(teamCount + 1);
            Swal.fire({
              title: "Removed!",
              text: `${asset.productName} is Removed from Your Request List`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleReturn = async (asset) => {
    try {
      const { data } = await axiosSecure.patch(`/assets/return/${asset._id}`);
      console.log(data);
      refetch();
      toast.success(`${asset.productName} will be Returned!`);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div>
      <Helmet>
        <title>My Assets</title>
      </Helmet>
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
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {assets
                      .filter((asset) => asset.requesterEmail === user.email)
                      .map((asset) => (
                        <tr key={asset._id}>
                          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                            {asset.productName}
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                            {asset.productType}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                            {asset.requestDate}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                            {asset.approveDate}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                            {asset.requestStatus}
                          </td>

                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            {/* <Action status={asset.requestStatus} productType={asset.productType} asset={asset}></Action> */}
                            <Action
                              status={asset.requestStatus}
                              productType={asset.productType}
                              asset={asset}
                              productName={asset.productName}
                              handleDelete={handleDelete}
                              handleReturn={handleReturn}
                            ></Action>
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
    </div>
  );
};

export default RequestedAsset;

// import { PDFViewer } from "@react-pdf/renderer";

const Action = ({ status, productType, asset, handleDelete, handleReturn }) => {
  //   const handleDelete = asset =>{

  //     Swal.fire({
  //         title: "Are you sure?",
  //         text: "You won't be able to revert this!",
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonColor: "#3085d6",
  //         cancelButtonColor: "#d33",
  //         confirmButtonText: "Yes, remove!"
  //       }).then((result) => {
  //         if (result.isConfirmed) {

  //             axiosSecure.patch(`/assets/cancel/${asset._id}`)
  //             .then(res =>{
  //                 console.log(res.data)
  //                 if(res.data.modifiedCount > 0){
  //                     refetch();
  //                     // setTeamCount(teamCount + 1);
  //                     Swal.fire({
  //                         title: "Removed!",
  //                         text: `${asset.productName} is Removed from Your Request List`,
  //                         icon: "success"
  //                       });
  //                 }
  //             })
  //         }
  //       });
  // }

  if (status === "pending") {
    return (
      <button onClick={() => handleDelete(asset)}>
        <RiDeleteBinLine />
      </button>
    );
  }
  if (status === "Approved" && productType === "returnable") {
    return (
      <button onClick={() => handleReturn(asset)}>
        <TbTruckReturn />
      </button>
    );
  }
  if (status === "Approved") {
    return (
      // <PDFViewer>
      <button>
        <MdOutlineFileDownload />
      </button>
      // </PDFViewer>
    );
  }
};
