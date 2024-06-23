import React from "react";
import { Link } from "react-router-dom";

interface BlogCardProps {
    id: number;
    authorName: string;
    title: string;
    content: string;
    publishDate: string;
}

export const BlogCard: React.FC<BlogCardProps> = React.memo(({ id, authorName, title, content, publishDate }) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="border-b mt-6 w-screen max-w-screen-sm cursor-pointer">
                <div className="flex items-center">
                    <Avatar name={authorName} />
                    <div className="font-medium pl-2 text-base">{authorName}</div>
                    <Circle />
                    <div className="text-slate-500 pl-2 text-sm">{publishDate}</div>
                </div>
                <div className="font-bold text-2xl">{title}</div>
                <div>{content.slice(0, 100) + "...."}</div>
                <div className="mt-5 text-slate-500 mb-2">{`${Math.ceil(content.length / 100)} minute's Read`}</div>
            </div>
        </Link>
    );
});

export default BlogCard;

interface AvatarProps {
    name: string;
    size?: "normal" | "big";
}

export const Avatar: React.FC<AvatarProps> = ({ name, size = "normal" }) => {
    const avatarSize = size === "normal" ? "h-6 w-6" : "h-10 w-10";

    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${avatarSize}`}>
            <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>
    );
};

function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-300"></div>;
}
