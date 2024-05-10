import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { UniqueBlog } from "../components/UniqueBlog";

export const Blog = ()=>{
    const {id} = useParams();
    const {loading,blog} = useBlog({
        id : id||""
    });
    if(loading){
        return <div>
            laoding...!!!
        </div>
    }
    return <div>
        <UniqueBlog />
    </div>
}
