import About from "./About";
import Package from "./Package";
import Slidder from "./Slidder";

const Home = () => {
    return (
        <div>
            <div className=" w-full mt-6">
            <Slidder></Slidder>

            </div>
            <div className="mt-36 text-center ">
                <About></About>
            </div>
            <div className="text-center mt-32 mb-20">
                <Package></Package>
            </div>
        </div>
    );
};

export default Home;