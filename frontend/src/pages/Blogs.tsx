import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"

export const Blogs = () =>{
    return <div className="font-serif">
        <Appbar/>
        <div className="flex justify-center">
            <div className="max-w-xl">
                <BlogCard authorName="Shubham gupta" title = "My first Blog, create during the development of the medium web app !!!" content = "this is my first blog and also this for testing purpose during the production period of the project of my medium bloging webApp" publishDate="08-April-2024" />
                <BlogCard authorName="Riya Goel" title = "How to learn by doing nothing, specialized approach !!!!!" content = "Hi in this blog , i am going to tell you how to learn and complete all the task without doing nothing, you just have to tell some other person to do it for you" publishDate="07-April-2024" />
                <BlogCard authorName="Shubham gupta" title = "Latest Tech Stack, Which helps you to get job faster and make you more efficient !!!" content = "Latest Trends in IT are : Next JS , Hono - cloudflare workers, PostgreSQL,Flutter, Firebase, Node JS, Express, React, BlockChain, Rust - for faster compilations. There are many more technologies which may help you to land a job but these are the most common one which are in demand in India" publishDate="10-April-2024" />
            </div>
        </div>
    </div>
}