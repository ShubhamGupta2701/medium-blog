import axios from "axios"
import { useEffect, useState } from "react"

export const useBlogs = ()=>{
    const [blogs,setBlogs] = useState([]);
    const [loading , setLoading] = useState(true);
    useEffect(()=>{
        axios.get(`{BACKEND_URL}/api/v1/blog/bulk`)
            .then(response=>{
                setBlogs(response.data);
                setLoading(false);
            })
    },[])
    return{
        loading,
        blogs
    }
}