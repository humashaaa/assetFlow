
const Header = ({title, subtitle, titleClass, subtitleClass}) => {
    return (
        <div className="text-center space-y-3 ">
            <span className=" "></span>
            <h1 className={`font-bold text-4xl mx-auto ${titleClass}`}>{title}</h1>
            <h3 className={`font-semibold w-1/2 text-xl mx-auto text-gray-500 ${subtitleClass}`}>{subtitle}</h3>
            
        </div>
    );
};

export default Header;