import React, { useEffect } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Editprofile from "./components/Editprofile";
import Chatpage from "./components/Chatpage";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setonlineusers } from "./redux/chatslice";
import axios from "axios";
import { setAuthUser } from "./redux/Authslice";
import { setsocket } from "./redux/socketslice";
import { Toaster } from "sonner";
import Search from "./components/Search";
import Explore from "./components/Explore";
import ProtectedRoutes from "./components/Protectedroutes";
import { addNotification } from './redux/notificationslice';
import { toast } from 'sonner';
import Notification from "./components/Notification";

const App = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);
  const { socket } = useSelector((store) => store.socketio);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("https://instax-ln7e.onrender.com/api/v1/user/me", {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAuthUser(res.data.user));
        } else {
          dispatch(setAuthUser(null));
        }
      } catch (err) {
        dispatch(setAuthUser(null));
      }
    };

    getUser();
  }, [dispatch]);

  useEffect(() => {
    let socket;

    if (user) {
      socket = io("https://instax-ln7e.onrender.com", {
        query: {
          userId: user?._id,
        },
        transports: ["websocket"],
      });
      dispatch(setsocket(socket));
      socket.on("getOnlineUsers", (onlineusers) => {
        dispatch(setonlineusers(onlineusers));
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [user, dispatch]);

  useEffect(() => {
    if (!socket) return;
    const handleNotification = (notification) => {
      dispatch(addNotification(notification));
      toast(notification.message);
    };
    socket.on('notification', handleNotification);
    return () => socket.off('notification', handleNotification);
  }, [socket, dispatch]);

  return (
    <Routes>
     <Route path="/"element={<ProtectedRoutes><MainLayout /></ProtectedRoutes>} >
        <Route index element={<Home />} />
        <Route path="/account/edit" element={<ProtectedRoutes><Editprofile /></ProtectedRoutes>}  />
        <Route path="profile/:id"element={<ProtectedRoutes><Profile /></ProtectedRoutes>}  />
        <Route path="/chat" element={<ProtectedRoutes><Chatpage /></ProtectedRoutes>}  />
         <Route path="/search"  element={<ProtectedRoutes><Search /></ProtectedRoutes>}  />
          <Route path="/explore"  element={<ProtectedRoutes><Explore /></ProtectedRoutes>}  />
          <Route path="/notification"  element={<ProtectedRoutes><Notification /></ProtectedRoutes>}  />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
