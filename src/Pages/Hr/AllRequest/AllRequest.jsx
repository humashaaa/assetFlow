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
    <div className="w-[78rem]">
      <Helmet>
        <title>All Request</title>
      </Helmet>
      <h1 className="font-bold text-3xl text-blue-950 text-center mt-14 mb-4">
        All Request
      </h1>

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
                      className="py-3.5 px-3 text-xl font-lora font-bold text-left rtl:text-right"
                    >
                      <div className="flex items-center gap-x-3">
                        <span className="text-blue-950 text-xl">
                          Asset Name
                        </span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 px-3 text-xl font-lora font-bold text-left rtl:text-right"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Asset Type</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 px-3 text-xl font-lora font-bold text-left rtl:text-right"
                    >
                      <span>Email of requester</span>
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 px-3 text-xl font-lora font-bold text-left rtl:text-right"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Name of requester</span>
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 px-3 text-xl font-lora font-bold text-left rtl:text-right"
                    >
                      Request Date
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 px-3 text-xl font-lora font-bold text-left rtl:text-right"
                    >
                      Additional note
                    </th>

                    <th className="py-3.5 px-3 text-xl font-lora font-bold text-left rtl:text-right">
                      Status
                    </th>

                    <th className="py-3.5 px-3 text-xl font-lora font-bold text-left rtl:text-right">
                      Action
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
                          <button onClick={() => handleReject(asset)}>
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
