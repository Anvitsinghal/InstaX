import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SuggestedUsers from './SuggestedUsers';

const RightSideBar = () => {
  const { user } = useSelector(store => store.auth);

  return (
    <div className="w-72 p-4 my-10 rounded-2xl  bg-white ">
      <div className="flex flex-col items-center gap-3">
        <Link to={`/profile/${user?._id}`}>
          <Avatar className="w-20 h-20">
            <AvatarImage src={user?.profilePicture} alt="profile" />
            <AvatarFallback>{user?.username?.charAt(0)?.toUpperCase() || 'X'}</AvatarFallback>
          </Avatar>
        </Link>

        <div className="text-center">
          <h1 className="font-semibold text-lg text-blue-600 hover:underline">
            <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user?.bio || 'This user has no bio yet...'}</p>
        </div>
      </div>

      <div className="mt-6">
        <SuggestedUsers />
      </div>
    </div>
  );
};

export default RightSideBar;
