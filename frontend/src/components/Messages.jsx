import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useSelector } from 'react-redux';
import getallmessage from '@/Hooks/usegetallmessage';
import realtimemessage from '@/Hooks/getrealtime';

const Messages = ({ selecteduser }) => {
  realtimemessage();
  const { user } = useSelector(store => store.auth);
  getallmessage();
  const { messages = [] } = useSelector(store => store.chat);

  return (
    <div className="p-4 md:pl-64 md:pr-72 mt-4 overflow-y-auto h-screen">
      {/* Profile preview */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-col items-center justify-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src={selecteduser?.profilePicture} alt="profile" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="mt-2 font-medium">{selecteduser?.username}</span>
          <Link to={`/profile/${selecteduser?._id}`}>
            <Button className="h-8 my-2" variant="secondary">
              View profile
            </Button>
          </Link>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex flex-col gap-3 px-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-xs text-sm text-white ${
                msg.senderId === user?._id ? 'bg-blue-600' : 'bg-gray-700'
              }`}
            >
              {typeof msg === 'string' ? msg : msg.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
