import React, { useEffect } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import Profile from './components/Profile';
import Editprofile from './components/Editprofile';
import Chatpage from './components/Chatpage';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { setonlineusers } from './redux/chatslice';
import axios from 'axios';
import { setAuthUser } from './redux/Authslice';

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/user/me', {
          withCredentials: true,
        });
  
        if (res.data.success) {
          dispatch(setAuthUser(res.data.user)); // ✅ Use res.data.user
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
      socket = io('http://localhost:8000', {
        query: {
          userId: user?._id,
        },
        transports: ['websocket'],
      });

      socket.on('getOnlineUsers', (onlineusers) => {
        dispatch(setonlineusers(onlineusers));
      });
    }

    return () => {
      if (socket) {
        socket.disconnect(); // properly close connection
      }
    };
  }, [user, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/account/edit" element={<Editprofile />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="/chat" element={<Chatpage />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
