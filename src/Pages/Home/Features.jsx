import Header from "../../Component/ReusableComponent/Header";
import img1 from '../../assets/feature1.png'
import img2 from '../../assets/feature2.png'
import img3 from '../../assets/feature3.png'
import img4 from '../../assets/feature4.png'
import img5 from '../../assets/feature5.png'
import img6 from '../../assets/feature6.png'
const Features = () => {
    return (
        <div>
            <Header
            title={"Features"}
            subtitle={"Explore the powerful features of AssetFlow designed to enhance your asset management efficiency and security."}
            ></Header>

            {/* features */}
            <div className="grid grid-cols-2 gap-6 pl-36  pt-28 pb-20">
                {/* feature 1 */}
               <div className="flex gap-4 ">
               <div>
                    <img className="w-24 h-24" src={img1} alt="" />
                </div>
                <div className="text-start py-3">
                    <h1 className="font-bold ">Advanced Asset Tracking</h1>
                    <p className="text-gray-500 w-4/5">Real-time tracking of asset status, location, and user assignments.</p>
                </div>

               </div>
                {/* feature 2 */}
               <div className="flex gap-4 ">
               <div>
                    <img className="w-24 h-24" src={img2} alt="" />
                </div>
                <div className="text-start py-3">
                    <h1 className="font-bold ">Digital Asset Requests</h1>
                    <p className="text-gray-500 w-4/5">Employees can request returnable or non-returnable assets via the platform.</p>
                </div>

               </div>
                {/* feature 3 */}
               <div className="flex gap-4 ">
               <div>
                    <img className="w-24 h-24" src={img3} alt="" />
                </div>
                <div className="text-start py-3">
                    <h1 className="font-bold ">Employee Asset History</h1>
                    <p className="text-gray-500 w-4/5">View records of damaged, lost, or returned items per employee for accountability.</p>
                </div>

               </div>
                {/* feature 4 */}
               <div className="flex gap-4 ">
               <div>
                    <img className="w-24 h-24" src={img4} alt="" />
                </div>
                <div className="text-start py-3">
                    <h1 className="font-bold ">Custom Workflows</h1>
                    <p className="text-gray-500 w-4/5">Design workflows tailored to company-specific asset management processes.</p>
                </div>

               </div>
                {/* feature 5 */}
               <div className="flex gap-4 ">
               <div>
                    <img className="w-24 h-24" src={img5} alt="" />
                </div>
                <div className="text-start py-3">
                    <h1 className="font-bold ">Asset Categories</h1>
                    <p className="text-gray-500 w-4/5">Allow businesses to define their own asset categories - returnable and non-returnable.</p>
                </div>

               </div>
                {/* feature 6 */}
               <div className="flex gap-4 ">
               <div>
                    <img className="w-24 h-24" src={img6} alt="" />
                </div>
                <div className="text-start py-3">
                    <h1 className="font-bold ">Asset Condition Management</h1>
                    <p className="text-gray-500 w-4/5">Record and monitor the condition of assets during check-out and return.</p>
                </div>

               </div>
            </div>
        </div>
    );
};

export default Features;