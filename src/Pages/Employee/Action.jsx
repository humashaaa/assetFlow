import { MdOutlineFileDownload } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbTruckReturn } from "react-icons/tb";
import Swal from "sweetalert2";
import useAxiosSecure from "../../useAxiosSecure/useAxiosSecure";
const Action = ({status, productType, asset, productName}) => {


  const axiosSecure = useAxiosSecure()

    const handleDelete = (asset) => {


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove!"
          }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/assets/cancel/${asset._id}`)
                .then(res =>{
                    console.log(res.data)
                    if(res.data.modifiedCount > 0){
                        Swal.fire({
                            title: "Removed!",
                            text: `${asset.productName} is Removed from Your Team `,
                            icon: "success"
                          });                       
                    }
                })      
            }
          });

      
      };       
      
      console.log(asset);
    

       if(status === 'pending'){
          return <button onClick={()=> handleDelete(asset)}><RiDeleteBinLine /></button>
        }
        if(status === 'Approved' && productType === 'returnable'){
          return <button><TbTruckReturn /></button>
        }
        if(status === 'Approved' ){
          return <button><MdOutlineFileDownload /></button>
        }
        

};

export default Action;