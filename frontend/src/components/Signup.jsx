
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { toast } from 'sonner'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Login from './Login'
const signup = () => {
     const navigate=useNavigate();
    const [input,setInput]=useState({
        username:"",
        email:"",
        password:""
    })
    const [loading,setloading]=useState(false);
    const changeEventHandler=(e)=>{
        setInput({
            ...input,[e.target.name]:e.target.value
        });
    }
    const signuphandler=async(e)=>{
         e.preventDefault();
         try {
            setloading(true);
            const res=await axios.post('http://localhost:8000/api/v1/user/register',input,{
                headers:{
                    'Content-Type':"application/json"
                },
                withCredentials:true
            })
            setInput({
                 username:"",
                email:"",
                  password:""
            })
            if(res.data.success){
              navigate("/login");
                toast.success(res.data.message);
            }
            else if(res.data.success==false){
                toast.message("Account already exists");
            }
         } catch (error) {
            toast.message("Enter all details");
            console.log(error);
         }
         finally{
            setloading(false);
         }
    }
  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
  <form onSubmit={signuphandler} className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 flex flex-col gap-6">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-indigo-600">LOGO</h1>
      <p className="text-lg font-medium text-gray-700 mt-2">Create your account</p>
    </div>

    <div className="flex flex-col">
      <label className="mb-1 font-medium text-gray-700">Username</label>
      <Input
        type="text"
        name="username"
        value={input.username}
        onChange={changeEventHandler}
        placeholder="Enter username"
        className="focus:ring-2 focus:ring-indigo-400 border border-gray-300 rounded-lg px-4 py-2 outline-none"
      />
    </div>

    <div className="flex flex-col">
      <label className="mb-1 font-medium text-gray-700">Email</label>
      <Input
        type="email"
        name="email"
        placeholder="Enter email"
         value={input.email}
        onChange={changeEventHandler}
        className="focus:ring-2 focus:ring-indigo-400 border border-gray-300 rounded-lg px-4 py-2 outline-none"
      />
    </div>

    <div className="flex flex-col">
      <label className="mb-1 font-medium text-gray-700">Password</label>
      <Input
        type="password"
        name="password"
        placeholder="Enter password"
         value={input.password}
        onChange={changeEventHandler}
        className="focus:ring-2 focus:ring-indigo-400 border border-gray-300 rounded-lg px-4 py-2 outline-none"
      />
    </div>

    <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg py-2 mt-4">
      Sign Up
    </Button>
     <span className="text-sm text-center text-gray-600 mt-4">
      Already have an account?{' '}
      <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
        Login
      </Link>
    </span> </form>
</div>

    </>
  )
}

export default signup
