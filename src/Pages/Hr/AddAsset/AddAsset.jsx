import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddAsset = () => {
    const {user} = useAuth()
    const navigate = useNavigate()
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const productName = form.productName.value;
    const productType = form.productType.value;
    const productQuantity = parseInt(form.productQuantity.value);
    const email = user?.email;
    const assetAdded = new Date().toLocaleDateString()
    const assetData = {
      productName,
      productQuantity,
      productType,
      email,
      assetAdded
    };
  


  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_URL}/asset`,
      assetData
    )
    console.log(data)
    toast.success('Asset Added Successfully!')
    navigate('/dashboard/assetList')
  } catch (err) {
    console.log(err)
  }
}

  return (
    <div className="mt-16">
      <h1 className="text-center font-bold text-4xl ">Add Asset</h1>

      {/* form */}
      <div className="flex items-center justify-center mt-20">
        <form onSubmit={handleFormSubmit}>
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
                className="input input-bordered"
                required
              />
            </div>

            <select
              name='productType'
              id='productType'
              className='border p-1 rounded-lg'
            >
              <option value=''>Select Product Type</option>
              <option value='returnable'>Returnable</option>
              <option value='non-returnable'>Non-returnable</option>
            </select>

            {/* <div className="form-control">
              <label className="label">
                <span className="label-text">Product Type</span>
              </label>
              <input
                type="text"
                placeholder="Product Type"
                name="productType"
                className="input input-bordered"
                required
              />
            </div> */}
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
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAsset;
