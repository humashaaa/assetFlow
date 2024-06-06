import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
const AssetList = () => {
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("");

const {data:lists=[], isPending, refetch} = useQuery({
    queryKey: ['lists'],
    queryFn: async()=>{
        const res = await axiosSecure.get(`/asset/${user?.email}`)
        return res.data
    }
})

  //   const handleSearch = (e) => {
  //     e.preventDefault();

  //     // setSearch(searchText)
  //   };

  //   console.log(search);

  //   asset list

  // useEffect(() => {
  //   getData()
  // }, [user])

  // const getData = async () => {
  //   const { data } = await axiosSecure.get(`/asset/${user?.email}`)
  //   setList(data)
  //   console.log(data);

  // }

  // const handleDeleteJob = async id => {
  //   try {
  //     const { data } = await axios.delete(
  //       `${import.meta.env.VITE_URL}/job/${id}`
  //     )
  //     console.log(data)
  //     toast.success('Deleted Successfully')

  //     //refresh ui
  //     getData()
  //   } catch (error) {
  //     console.log(error.message)
  //     toast.error(error.message)
  //   }
  // }

  return (
    <div className="p-10">
      <div className="mt-10">
        <h1 className="text-center font-bold text-4xl ">Asset List</h1>

        {/* search */}
        <div className=" mt-11 flex item-center justify-around">
          <div>
            <form
            //   onSubmit={handleSearch}
            >
              <div className="flex p-1 overflow-hidden  rounded-lg    focus-within:border-blue-400 focus-within:ring-blue-300 items-center justify-center">
                <input
                  className="px-6 border-2  py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                  type="text"
                  // onChange={e => {setSearchText(e.target.value)
                  //   refetch()
                  // }
                  // }
                  // value={searchText}
                  name="search"
                  placeholder="Enter Job Title"
                  aria-label="Enter Job Title"
                />

                <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-blue-500 rounded-md ">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* filter */}

        <div>
          <select
            // onChange={(e) => {
            //   setFilter(e.target.value);
            //   // refetch()
            // }}
            // value={filter}
            name="category"
            id="category"
            className="border p-4 rounded-lg"
          >
            <option value="">Filter By Category</option>
            <option value="stock-status">Stock status</option>
            <option value="asset-type">Asset type</option>
          </select>
        </div>

        {/* sorting */}

        <h1 className="text-2xl font-bold">sorting</h1>
      </div>

      {/* asset list */}

      <div className="flex flex-col mt-6">
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
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Added Date</span>
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Edit
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {lists.map((list) => (
                    <tr key={list._id}>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {list.productName}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {list.productType}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {list.productQuantity}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {list.assetAdded}
                      </td>

                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                        <button
                          className="text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                          </button>
                         
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <button
                            // onClick={() => handleDeleteJob(job._id)}
                            className="text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                         
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

export default AssetList;
