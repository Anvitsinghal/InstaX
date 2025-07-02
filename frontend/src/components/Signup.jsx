import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Signup = () => {
  const {user}=useSelector(store=>store.auth);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setloading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const signuphandler = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await axios.post(
        "https://instax-ln7e.onrender.com/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setInput({ username: "", email: "", password: "" });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      } else {
        toast.message("Account already exists");
      }
    } catch (error) {
      toast.message("Enter all details");
      console.log(error);
    } finally {
      setloading(false);
    }
  };
useEffect(()=>{
  if(user){
    navigate("/");
  }
},[])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4">
      <form
        onSubmit={signuphandler}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-8 flex flex-col gap-6"
      >
        <div className="text-center space-y-1">
          <h1 className="text-4xl font-bold tracking-tight text-indigo-400">
             ⚡ Insta-X ⚡
          </h1>
          <p className="text-gray-300 text-sm">Create your account</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300">Username</label>
          <Input
            type="text"
            name="username"
            value={input.username}
            onChange={changeEventHandler}
            placeholder="Enter username"
            className="bg-black/40 border border-white/10 text-white placeholder-gray-400 focus:ring-indigo-400 focus:border-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300">Email</label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="Enter email"
            className="bg-black/40 border border-white/10 text-white placeholder-gray-400 focus:ring-indigo-400 focus:border-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300">Password</label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            placeholder="Enter password"
            className="bg-black/40 border border-white/10 text-white placeholder-gray-400 focus:ring-indigo-400 focus:border-indigo-500"
          />
        </div>

        <Button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg mt-2"
        >
          {loading ? "Please Wait..." : "Sign Up"}
        </Button>

        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
