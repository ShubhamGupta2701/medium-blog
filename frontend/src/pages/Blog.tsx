import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { UniqueBlog } from "../components/UniqueBlog";
import { Appbar } from "../components/Appbar";
import { Spinner } from "../components/Spinner";

export const Blog = ()=>{
    const {id} = useParams();
    const {loading,blog} = useBlog({
        id : id||""
    });
    if(loading){
        return <div className="font-serif">
            <Appbar/>
            <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center">
                    <Spinner />
                </div>
            </div>
        </div>
    }
    return <div>
        <UniqueBlog blog={blog}/>
    </div>
}
