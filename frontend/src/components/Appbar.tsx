import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import Logout from './Logout'; // Ensure the correct import path

export const Appbar = () => {
    return (
        <div className="border-b flex justify-between px-8 py-2 font-mono">
            <Link to="/Blogs" className="text-2xl font-semibold font-mono flex flex-col justify-center">
                Medium Blogging
            </Link>
            <div className="flex justify-center mt-2 mb-2">
                <Link to="/publish" className="px-4 py-2 mx-2 border-black border-2 rounded-full">
                    <div className="font-extrabold">
                        Add
                    </div>
                </Link>
                <Logout />
                <div className="mt-2">
                    <img className="h-8 w-8" src={logoImg} alt="logo" />
                </div>
            </div>
        </div>
    );
};


