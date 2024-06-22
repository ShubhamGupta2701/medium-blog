import { Link } from "react-router-dom";
import logoImg from "../assets/logo.png";

const Appbar = () => {
    return (
        <div className="border-b flex justify-between px-8 py-2 font-mono">
            {/* Logo and Title */}
            <Link to={"/Blogs"} className="text-2xl font-semibold flex items-center">
                <img className="h-8 w-8 mr-2" src={logoImg} alt="logo" />
                Medium Blogging
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center">
                <Link to={'/publish'} className="btn">
                    Add
                </Link>
                <Link to={'/'} className="btn">
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default Appbar;

