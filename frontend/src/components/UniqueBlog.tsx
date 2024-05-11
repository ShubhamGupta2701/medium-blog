import { Appbar } from "./Appbar"
import { Blog } from "../hooks"
import { Avatar } from "./BlogCard"

export const UniqueBlog = ({blog} : {blog:Blog}) => {
    return <div className="font-serif">
        <Appbar />
        <div className="grid grid-cols-12 px-10 w-full pt-14 max-w-screen-2xl">
            <div className="col-span-8">
                <div className="text-5xl font-extrabold">
                    {blog.title}
                </div>
                <div className="text-xl mt-8">
                    {blog.content}
                </div>
            </div>
            <div className="col-span-4 pl-8">
                <div className="text-lg mb-2 text-slate-500">
                    Author
                </div>
                <div className="flex w-full">
                    <div className="pr-2">
                        <Avatar size="big" name={blog.author.name || "Anonymus"} />
                    </div>
                    <div className="text-2xl font-extrabold">
                        {blog.author.name || "Anonymus"}
                    </div>
                </div>
                    <div className="text-lg mt-2 pl-8 text-slate-500">
                        About Author, this is just for let other users to know about user and nothing else
                    </div>    
            </div>
        </div>
    </div>
}