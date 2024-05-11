import { Link } from "react-router-dom"
import {Avatar} from "./BlogCard"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 mt-2 ">
        <Link to={"/Blogs"} className="text-xl font-semibold font-mono flex flex-col justify-center">
            Medium Bloging
        </Link>
        <div className="flex justify-between">
            <button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
                Add
            </button>
            <Avatar name={"Shubham Gupta"} size={"big"}/>
        </div>
    </div>
}