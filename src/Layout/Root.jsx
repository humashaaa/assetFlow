import { Outlet } from "react-router-dom";
import Footer from "../Component/Footer";
import Nav from "../Component/Nav";

const Root = () => {
    return (
        <div>
            <div className="">
            <Nav></Nav>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            
        </div>
    );
};

export default Root;