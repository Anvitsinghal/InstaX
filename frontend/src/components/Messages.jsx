import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useSelector } from 'react-redux';
import getallmessage from '@/Hooks/usegetallmessage';
import realtimemessage from '@/Hooks/getrealtime';

const Messages = ({ selecteduser }) => {
  realtimemessage();
  getallmessage();

  const { user } = useSelector(store => store.auth);
  const { messages = [] } = useSelector(store => store.chat);

  return (
    <div className="flex flex-col gap-3 py-4">
      {messages.map((msg, idx) => (
        <div key={idx} className={`flex ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'}`}>
          <div
            className={`px-4 py-2 rounded-xl max-w-[80%] text-sm ${
              msg.senderId === user?._id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-white'
            }`}
          >
            {typeof msg === 'string' ? msg : msg.message}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
