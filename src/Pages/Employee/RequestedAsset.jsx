import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
// import { useQuery } from "@tanstack/react-query";

const RequestedAsset = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState('')


//   const {
//     isPending,
//     data,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["jobs"],
//     queryFn: async () => {
//       const res = await fetch(
//         `${import.meta.env.VITE_URL}/jobs?search=${search}`
//       );
//       return res.json();
//     },
//   });
//   useEffect(() => {
//     refetch();
//   }, [search, filter, refetch]);

//   if (isPending) {
//     return (
//       <div className="item-center justify-center">
//         <span className="loading loading-spinner text-neutral"></span>
//       </div>
//     );
//   }
//   if (isError) return <p>{error.message}</p>;







  const handleSearch = (e) => {
    e.preventDefault();

    // setSearch(searchText)
  };

  console.log(search);



//   const {isPending, data, isError, error, refetch} = useQuery({
//     queryKey: ['appliedJobs'],
//     queryFn: async ()=>{
//         const res = await fetch(`${import.meta.env.VITE_URL}/appliedJobs/${user?.email}?filter=${filter}`);
//         return res.json()
//     }
// })






  return (
    <div>
      {/* search */}
      <div className=" mt-11 flex item-center justify-around">
      <div>
      <form onSubmit={handleSearch}>
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


        {/* filter */}

        <div>
            <select
              onChange={e => {
                setFilter(e.target.value)
                // refetch()
              }}
              value={filter}
              name='category'
              id='category'
              className='border p-4 rounded-lg'
            >
              <option value=''>Filter By Category</option>
              <option value='pending'>Pending</option>
              <option value='approved'>Approved</option>
              <option value='returnable'>Returnable</option>
              <option value='non-returnable'>Non-returnable </option>
            </select>
          </div>




      </div>
    </div>
  );
};

export default RequestedAsset;
