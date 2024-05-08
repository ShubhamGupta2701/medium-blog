
interface BlogcardProps{
    authorName : string;
    title : string;
    content : string;
    publishDate : string;
}

export const BlogCard = ({authorName,title,content,publishDate}:BlogcardProps) =>{
    return <div>
        <div>
            <div>
                {authorName}
            </div>
            <div>
                {publishDate}
            </div>
        </div>
        <div>
            {title}
        </div>
        <div>
            {content.slice(0,100) + "...."}
        </div>
        <div>
            {`${Math.ceil(content.length/100)} minute's Read`}
        </div>
    </div>
}