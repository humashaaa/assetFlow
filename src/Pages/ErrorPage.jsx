import { Link } from "react-router-dom";
import errorPage from '../assets/404.jpg'

const ErrorPage = () => {
    return (
        <div className="flex flex-col justify-center">
        <img className="w-96 h-96 mx-auto" src={errorPage} alt="" />
        <Link to='/' className="mx-auto text-gray-800 bg-slate-200 p-3 rounded-3xl">Go Back Home</Link>
    </div>
    );
};

export default ErrorPage;