import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom"
import { SignupInput } from "@shubhamgupta2701/medium-common";

export  const Auth = ({type}:{type:"signup" | "signin"})=>{
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name : "",
        email : "",
        password : "" 
    });  

    return (
        <div className="flex justify-center h-screen flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="text-4xl font-extrabold">
                        Create a Account
                    </div>
                    <div className="text-center text-slate-400">
                        Already have an accout?
                        <Link className="pl-2 underline" to={"/signin"}>Login</Link> 
                    </div>
                    <div className="mt-6">
                    <LabelledInput label = "Name" placeholder="Enter Your Name" onChange={(e)=>{
                    setPostInputs(c=>({...c,name:e.target.value}))}} />
                    <LabelledInput label = "Email" placeholder="something@gmail.com" onChange={(e)=>{
                    setPostInputs(c=>({...c,name:e.target.value}))}} />
                    <LabelledInput label = "Password" placeholder="*********" onChange={(e)=>{
                    setPostInputs(c=>({...c,name:e.target.value}))}} />
                    </div> 
                </div>
            </div>
        </div>
    )
}

interface LabelledInputType {
    label : string;
    placeholder : string;
    onChange : (e:ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({ label, placeholder, onChange} : LabelledInputType){
    return <div>
    <div>
        <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
            <div className="mt-2 mb-2">
                <input onChange ={onChange}id="text" name="first_name" className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder={placeholder} required />
            </div>
        </div>
    </div>
}