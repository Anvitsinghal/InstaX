import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/Authslice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user}=useSelector(store=>store.auth);
  const [input, setInput] = useState({
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

  const Loginhandler = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await axios.post(
        "https://instax-ln7e.onrender.com/api/v1/user/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setInput({ email: "", password: "" });

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      } else {
        toast.message("Wrong Email or Password");
      }
    } catch (error) {
      toast.message("Wrong Email or Password");
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
        onSubmit={Loginhandler}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-8 flex flex-col gap-6"
      >
        <div className="text-center space-y-1">
          <h1 className="text-4xl font-bold tracking-tight text-indigo-400 glow">
            ⚡ Insta-X ⚡
          </h1>
          <p className="text-gray-300 text-sm">Welcome back. Login to continue.</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300">Email</label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="Enter your email"
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
            placeholder="Enter your password"
            className="bg-black/40 border border-white/10 text-white placeholder-gray-400 focus:ring-indigo-400 focus:border-indigo-500"
          />
        </div>

        {loading ? (
          <Button
            disabled
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <Loader2 className="animate-spin w-5 h-5" />
            Please Wait
          </Button>
        ) : (
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg">
            Login
          </Button>
        )}

        <p className="text-sm text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-400 hover:underline font-semibold"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
