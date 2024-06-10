import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
// import useAxiosSecure from "../../../useAxiosSecure/useAxiosSecure";

const MyAsset = () => {
  const { user } = useAuth();
  // const navigate = useNavigate();
  // const axiosSecure = useAxiosSecure()
  let [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-16">
        Request For an Asset
      </h1>

      {/* form */}

      <div className="flex items-center justify-center mt-20">
        <form>
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
              name="productType"
              id="productType"
              className="border p-1 rounded-lg"
            >
              <option value="">Select Product Type</option>
              <option value="returnable">Returnable</option>
              <option value="non-returnable">Non-returnable</option>
            </select>
          </div>
          {/* 2nd row */}

          <select
            name="availability"
            id="availability"
            className="border p-1 rounded-lg"
          >
            <option value="">Availability</option>
            <option value="available">Available</option>
            <option value="out of stock">Out of stock</option>
          </select>
          <div className="form-control mt-6">
            <button onClick={openModal} className="btn btn-primary">
              Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyAsset;
