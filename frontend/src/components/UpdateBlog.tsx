import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { Appbar } from "./Appbar";

export const UpdateBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    
    return <div>
        <Appbar />
        <div className="flex justify-center mt-4 ">
            <div className="max-w-screen-lg w-full">
                <div className="mb-4">
                    <label className="block mb-2 font-extrabold text-gray-900 text-3xl">Title</label>
                    <input onChange={(e)=>{
                        setTitle(e.target.value)
                    }} type="text" id="default-input" className=" px-2 py-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-3"placeholder="Enter Title"/>
                </div>
                <div className="py-2">
                    <TextEditor onChange={(e)=>{
                        setContent(e.target.value)
                    }}/>
                </div>
                <button onClick={async()=>{
                    const response = await axios.put(`${BACKEND_URL}/api/v1/blog`,{
                        title,content
                    },{
                        headers : {
                            Authorization : localStorage.getItem('token')
                        }
                    });
                    navigate(`/blog/${response.data.id}`)
                }} type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 ">
                    Update Blog
                </button>
                
            </div>
        </div>
    </div>
}

function TextEditor({ onChange }: {onChange : (e : ChangeEvent<HTMLTextAreaElement>)=>void}){
    return <form>
        <div className="w-full mb-4 border border-gray-300 rounded-lg bg-gray-50 ">
            <div className="px-2 py-2 bg-white rounded-lg ">
                <textarea onChange={onChange} id="comment" rows={8} className="focus:outline-none w-full px-0 text-sm text-gray-900 bg-white border-0" placeholder="Enter Content for Blog  ..." required ></textarea>
            </div>
        </div>
    </form>
}