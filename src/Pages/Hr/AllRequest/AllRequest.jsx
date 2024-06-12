import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../useAxiosSecure/useAxiosSecure";
import { MdLibraryAddCheck } from "react-icons/md";
import { IoIosRemoveCircle } from "react-icons/io";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
const AllRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: assets = [], refetch } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/asset/${user.email}`);
      console.log(res.data);

      return res.data;
    },
  });

  console.log(assets);

  //   approve
  const handleApprove = (asset) => {
    axiosSecure.patch(`/assets/${asset._id}/allRequest`).then((res) => {
      // console.log(res.data)
      if (res.data.modifiedCount > 0) {
        refetch();
        // setTeamCount(teamCount + 1);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Request of ${asset.requesterName} is Approved!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleReject = (asset) => {
    axiosSecure.patch(`/assets/${asset._id}/reject`).then((res) => {
      // console.log(res.data)
      if (res.data.modifiedCount > 0) {
        refetch();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Request of ${asset.requesterName} is Rejected!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
       <Helmet>
        <title>All Request</title>
      </Helmet>
      <h1 className="font-bold text-3xl text-center mt-20">All Request</h1>

      {/* all request */}

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
                        <span></span>
                      </div>
                    </th>
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
                        <span>Asset Type</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Email of requester</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Name of requester</span>
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Request Date
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Additional note
                    </th>

                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Status
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Approve Button
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Reject Button
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {assets
                    .filter((asset) => asset.requesterEmail)
                    .map((asset, index) => (
                      <tr key={asset._id}>
                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          {asset.productName}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          {asset.productType}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          {asset.requesterEmail}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          {asset.requesterName}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {new Date(asset.requestDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          {asset.addNote}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {asset.requestStatus}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <button onClick={() => handleApprove(asset)}>
                            <MdLibraryAddCheck />
                          </button>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <button onClick={()=>handleReject(asset)}>
                            <IoIosRemoveCircle />
                          </button>
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

export default AllRequest;
