import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { toast } from 'sonner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { setAuthUser } from '@/redux/Authslice'
import CreatePost from './CreatePost'

const LeftSidebar = () => {
  const {user}=useSelector(store=>store.auth);
  const dispatch=useDispatch();
    const navigate=useNavigate();
      const sidebarItems = [
        { icon: <Home />, text: "Home" },
        { icon: <Search />, text: "Search" },
        { icon: <TrendingUp />, text: "Explore" },
        { icon: <MessageCircle />, text: "Messages" },
        { icon: <Heart />, text: "Notifications" },
        { icon: <PlusSquare />, text: "Create" },
        {
            icon: (
                <Avatar className='w-6 h-6'>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                       </Avatar>
            ),
            text: "Profile"
        },
        { icon: <LogOut />, text: "Logout" },
    ]
       const sidebarHandler = (textType) => {
        if (textType === 'Logout') {
            logoutHandler();
        }
        else if(textType==='Create'){
          setopen(true);
        }
    }
    const [open,setopen]=useState(false);
  
    const logoutHandler = async ()=>{
        try {
            const res=await axios.get("http://localhost:8000/api/v1/user/logout",{withCredentials:true});
            if(res.data.success){
              dispatch(setAuthUser(null));
                navigate("/login");
                toast.success(res.data.message);
            } 
        } catch (error) {
            toast.message("Can't Logged Out Now! Try again Later");
        }
    }
  return (
   <div className="fixed top-0 left-0 h-screen w-[16%] px-4 py-6 border-r border-gray-200 bg-white shadow-sm z-10">
  <div className="flex flex-col h-full justify-between">
    <div>
      <h1 className="text-2xl font-extrabold text-indigo-600 mb-10 pl-2">LOGO</h1>

      <div className="flex flex-col gap-2">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            onClick={() => sidebarHandler(item.text)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-indigo-100 cursor-pointer group"
          >
            <span className="text-indigo-600 group-hover:scale-110 transition-transform">
              {item.icon}
            </span>
            <span className="text-gray-800 font-medium">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
<CreatePost open={open} setopen={setopen}/>
    {/* Optional bottom section (e.g., profile/settings/logout) */}
    <div className="text-sm text-gray-400 pl-2">© 2025 MyApp</div>
  </div>
</div>

  )
}

export default LeftSidebar
