import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/Authslice";
import CreatePost from "./CreatePost";
import { setPosts, setselectedposts } from "@/redux/Postslice";

const LeftSidebar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openCreate, setOpenCreate] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarItems = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Heart />, text: "Notifications" },
    { icon: <PlusSquare />, text: "Create" },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut />, text: "Logout" },
  ];

  const sidebarHandler = (textType) => {
    if (textType === "Logout") {
      logoutHandler();
    } else if (textType === "Create") {
      setOpenCreate(true);
    } else if (textType === "Profile") {
      navigate(`/profile/${user?._id}`);
    } else if (textType === "Home") {
      navigate(`/`);
    } else if (textType === "Messages") {
      navigate("/chat");
    }
    else if(textType==="Search"){
      navigate("/search");
    }
    else if(textType==="Explore"){
      navigate("/explore");
    }
    else if(textType==="Notifications"){
      navigate("/notification");
    }
    

    setIsMobileMenuOpen(false); // close on mobile after navigation
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setselectedposts(null));
        dispatch(setPosts([]));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.message("Can't Log Out Now! Try again later.");
    }
  };

  return (
    <>
      {/* Sidebar for desktop */}
      <div className="hidden md:flex fixed top-0 left-0 h-screen w-64 px-4 py-6 bg-black text-white shadow-lg backdrop-blur-md border-r border-white/10 z-20">
        <div className="flex flex-col h-full justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-indigo-400 mb-10">
               ⚡ Insta-X ⚡
            </h1>

            <div className="flex flex-col gap-2">
              {sidebarItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => sidebarHandler(item.text)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-indigo-600/30 cursor-pointer group"
                >
                  <span className="group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-400">Made by Anvit</div>
        </div>
      </div>

      {/* Hamburger icon for mobile */}
      <div className="md:hidden fixed top-4 left-4 z-30">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md bg-black/50 text-white hover:bg-black/70"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 h-screen w-3/4 bg-black/80 backdrop-blur-lg shadow-lg text-white p-6 z-20">
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-indigo-400 mb-6"> ⚡ Insta-X ⚡</h1>
            {sidebarItems.map((item, index) => (
              <div
                key={index}
                onClick={() => sidebarHandler(item.text)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-500/30 cursor-pointer"
              >
                <span>{item.icon}</span>
                <span className="text-base font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Post modal */}
      <CreatePost open={openCreate} setopen={setOpenCreate} />
    </>
  );
};

export default LeftSidebar;
