import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageCircleCode } from 'lucide-react';
import { setselecteduser } from '@/redux/Authslice';
import Messages from './Messages';
import axios from 'axios';
import { setmessages } from '@/redux/chatslice';

const Chatpage = () => {
  const [textmessage, settextmessage] = useState('');
  const dispatch = useDispatch();
  const { onlineusers, messages = [] } = useSelector(store => store.chat);
  const { user, suggestedusers, selecteduser } = useSelector(store => store.auth);

  const sendMessageHandler = async (receiverid) => {
    try {
      const res = await axios.post(
        `https://instax-ln7e.onrender.com/api/v1/message/send/${receiverid}`,
        { textmessage },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setmessages([...(messages || []), res.data.newMessage]));
        settextmessage('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(setselecteduser(null));
  }, [dispatch]);

  return (
    <div className="flex flex-col md:flex-row-reverse h-screen w-full overflow-hidden">
      {/* Sidebar (Right on desktop, bottom in DOM) */}
      <aside className="w-full md:w-1/4 border-l border-gray-700 bg-black text-white p-4 overflow-y-auto">
        <h1 className="text-xl font-bold mb-4">{user?.username}</h1>
        <hr className="border-gray-600 mb-4" />
        <div className="space-y-2">
          {suggestedusers.map((suggestedUser) => {
            const isOnline = onlineusers.includes(suggestedUser?._id);
            return (
              <div
                key={suggestedUser._id}
                onClick={() => dispatch(setselecteduser(suggestedUser))}
                className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer transition"
              >
                <Avatar className="w-12 h-12">
                  <AvatarImage src={suggestedUser?.profilePicture} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{suggestedUser?.username}</span>
                  <span className={`text-xs font-bold ${isOnline ? 'text-green-500' : 'text-red-500'}`}>
                    {isOnline ? 'online' : 'offline'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Chat Window */}
      {selecteduser ? (
      <main className="flex-1 flex flex-col h-full bg-[#0f0f0f] text-white max-w-full md:max-w-[56%]">

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800 sticky top-0 bg-[#0f0f0f] z-10">
            <Avatar>
              <AvatarImage src={selecteduser?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-sm font-semibold">{selecteduser?.username}</h2>
              <span className="text-xs text-gray-400">Chat started</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4">
            <Messages selecteduser={selecteduser} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-800 p-4 flex items-center">
            <Input
              value={textmessage}
              onChange={(e) => settextmessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 mr-2 bg-gray-900 text-white border-none focus:ring-0"
            />
            <Button onClick={() => sendMessageHandler(selecteduser?._id)} className="bg-blue-600 hover:bg-blue-700">
              Send
            </Button>
          </div>
        </main>
      ) : (
        <div className="flex-1 flex items-center justify-center text-white bg-[#0f0f0f] flex-col text-center">
          <MessageCircleCode className="w-16 h-16 mb-2" />
          <p className="text-lg font-medium">Your messages</p>
          <span className="text-gray-400">Select a user to start chatting</span>
        </div>
      )}
    </div>
  );
};

export default Chatpage;
