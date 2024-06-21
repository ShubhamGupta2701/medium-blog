import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@shubhamgupta2701/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export  const Auth = ({type}:{type:"signup" | "signin"})=>{
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name : "",
        email : "",
        password : "" 
    });  


    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
console.log('Response:', response.data);

            const jwt = response.data.token;
            // console.log(jwt);
            localStorage.setItem("token",jwt);
            navigate("/blogs");
            alert("successfully login")
            // console.log(jwt);
        }catch(e){
            console.log(e);
            alert(e);
        }
    }

    return (
        <div className="flex justify-center h-screen flex-col font-mono">
            <div className="flex justify-center">
                <div>
                    <div className="text-4xl font-extrabold px-10">
                        {type === "signin" ? "Welcome back" : "Create an Account"}
                    </div>
                    <div className="text-center text-slate-400">
                        {type === "signin" ? "Don't have an Account" : "Already have an Account"}
                        <Link className="pl-2 underline" to={type==="signin"?"/signup":"/signin"}>{type === "signin" ? "Sign up" : "Login"}</Link>
                    </div>
                    <div className="mt-6">
                    {type === "signup" ? <LabelledInput label = "Name" type = "text" placeholder="Enter Your Name" onChange={(e)=>{
                    setPostInputs(c=>({...c,name:e.target.value}))}} /> : null}
                    <LabelledInput label = "Email" type = "email" placeholder="example@gmail.com" onChange={(e)=>{
                    setPostInputs(c=>({...c,email:e.target.value}))}} />
                    <LabelledInput label = "Password" type = "password" placeholder="*********" onChange={(e)=>{
                    setPostInputs(c=>({...c,password:e.target.value}))}} />
                    </div> 
                    <div>
                    <button onClick={sendRequest} type="submit" className="mt-6 flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{type === "signin" ? "Log In" : "Sign up "}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface LabelledInputType {
    label : string;
    placeholder : string;
    type : string;
    onChange : (e:ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({ label, placeholder, onChange, type} : LabelledInputType){
    return <div>
    <div>
        <label className="block text-sm font-bold leading-6 text-gray-900">{label}</label>
            <div className="mt-2 mb-2">
                <input onChange ={onChange} type={type||"text"} id="text" name={label}  className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder={placeholder} required />
            </div>
        </div>
    </div>
}