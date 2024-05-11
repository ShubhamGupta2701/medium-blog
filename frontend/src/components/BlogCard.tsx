import { Link } from "react-router-dom";

interface BlogcardProps{
    id:number,
    authorName : string;
    title : string;
    content : string;
    publishDate : string;
}

export const BlogCard = ({id,authorName,title,content,publishDate}:BlogcardProps) =>{
    return <Link to= {`/blog/${id}`}>
        <div className="border-b mt-6 w-screen max-w-screen-sm cursor-pointer">
            <div className="flex">
                <div className="flex justify-center flex-col">
                    <Avatar name = {authorName}/>
                </div>
                <div className="font-medium pl-2 text-base flex justify-center flex-col">
                    {authorName}
                </div>
                <div className="flex justify-center flex-col pl-2">
                    <Circle/>
                </div>
                <div className="text-slate-500 pl-2 text-sm flex justify-center flex-col">
                    {publishDate}
                </div>
            </div>    
            <div className="font-bold text-2xl">
                {title}
            </div>
            <div>
                {content.slice(0,100) + "...."}
            </div>
            <div className="mt-5 text-slate-500 mb-2">
                {`${Math.ceil(content.length/100)} minute's Read`}
            </div>
        </div>
    </Link>
}

export function Avatar({name,size="normal"}:{name : string,size?:string}){
    return <div>
        <div className={`relative inline-flex items-center justify-center ${size==="normal" ? "h-6 w-6": "h-8 w-8"}  overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
            <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>
    </div>
}

function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-300">

    </div>
}