import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateList = () => {

    const { user } = useAuth()
    const navigate = useNavigate()
    const list = useLoaderData()
    const {
      _id,
      productName,
      productQuantity,
      productType,
      email,
      assetAdded
    } = list || {}
  console.log(list);
    
    const handleSubmit = async e => {
      e.preventDefault()
      const form = e.target;
    const productName = form.productName.value;
    const productType = form.productType.value;
    const productQuantity = parseInt(form.productQuantity.value);
    const email = user?.email;
    const assetAdded = new Date().toLocaleDateString()
    const updatedAsset = {
        _id,
      productName,
      productQuantity,
      productType,
      email,
      assetAdded
    };
  
      try {
        const { data } = await axios.patch(
          `${import.meta.env.VITE_URL}/assets/${_id}`,
          updatedAsset
        )
        console.log(data)
        toast.success('Asset Updated Successfully!')
        navigate('/dashboard/assetList')
      } catch (err) {
        console.log(err)
        toast.error(err.message)
      }
    }





    return (
        <div>
            <h1 className="font-bold text-2xl text-center mt-10">Update {productName}</h1>

            <div className="flex items-center justify-center mt-20">
        <form onSubmit={handleSubmit}>
          {/* row 1 */}
          <div className="flex gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                type="text"
                placeholder="Product Name"
                name="productName"
                defaultValue={productName}
                className="input input-bordered"
                required
              />
            </div>

            <select
              name='productType'
              defaultValue={productType}
              id='productType'
              className='border p-1 rounded-lg'
            >
              <option value=''>Select Product Type</option>
              <option value='returnable'>Returnable</option>
              <option value='non-returnable'>Non-returnable</option>
            </select>

          </div>
          {/* 2nd row */}

          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Quantity</span>
            </label>
            <input
              type="text"
              placeholder="Product Quantity"
              name="productQuantity"
              defaultValue={productQuantity}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
        </div>
    );
};

export default UpdateList;