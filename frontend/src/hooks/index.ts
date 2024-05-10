import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

interface Blog{
    "title":string;
    "content" : string;
    "id":number;
    "author" : {
        "name":string;
    }
}

export const useBlog = ({id}: { id:string}) =>{
    const [blog,setBlog] = useState<Blog>();
    const [loading , setLoading] = useState(true);
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                Authorization : localStorage.getItem('token')
            }
        })
            .then(response=>{
                setBlog(response.data);
                setLoading(false);
            })
    },[id])
    return{
        loading,
        blog
    }    
}

export const useBlogs = ()=>{
    const [blogs,setBlogs] = useState<Blog  []>([]);
    const [loading , setLoading] = useState(true);
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization : localStorage.getItem('token')
            }
        })
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

// we have to add more funtionality to it
