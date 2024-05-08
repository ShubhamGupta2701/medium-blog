import {Avatar} from "./BlogCard"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-2 ">
        <div className="text-lg font-semibold font-mono flex flex-col justify-center">
            Medium Bloging
        </div>
        <div>
            <Avatar name={"Shubham Gupta"} size={"max"}/>
        </div>
    </div>
}