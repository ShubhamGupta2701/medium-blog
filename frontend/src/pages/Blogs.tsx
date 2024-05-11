import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { LooadingSkeleton } from "../components/LoadingSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = () =>{
    const {loading,blogs} = useBlogs();

    if(loading){
        return <div className="font-serif ">
            <Appbar/>
            <div className="flex justify-center">
                <div >
                    <LooadingSkeleton/>
                    <LooadingSkeleton/>
                    <LooadingSkeleton/>
                    <LooadingSkeleton/>
                </div>
            </div>
        </div>
    }

    return <div className="font-serif">
        <Appbar/>
        <div className="flex justify-center">
            <div className="max-w-xl">
                {blogs.map( blog => <BlogCard
                id={blog.id}
                authorName={blog.author.name || "Anonymus"} 
                title = {blog.title} 
                content = {blog.content} 
                publishDate={"08-April-2024"}
                />)}
            </div>
        </div>
    </div>
}