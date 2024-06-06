import { Outlet } from "react-router-dom";
import Footer from "../Component/Footer";
import Nav from "../Component/Nav";

const Root = () => {
    return (
        <div>
            <Nav></Nav>
            <div>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            
        </div>
    );
};

export default Root;