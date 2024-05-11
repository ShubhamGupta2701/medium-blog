import { Appbar } from "./Appbar"
import { Blog } from "../hooks"

export const UniqueBlog = ({blog} : {blog:Blog}) => {
    return <div className="font-serif">
        <Appbar />
        <div className="grid grid-cols-12 px-10 w-full pt-8">
            <div className="col-span-8">
                <div className="text-3xl font-extrabold">
                    {blog.title}
                </div>
                <div className="text-xl mt-4">
                    {blog.content}
                </div>
            </div>
            <div className="col-span-4">
            </div>
        </div>
    </div>
}