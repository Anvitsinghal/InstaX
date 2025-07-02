import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { toast } from 'sonner';
import axios from 'axios';
import { setAuthUser } from '@/redux/Authslice';

const SuggestedUsers = () => {
  const dispatch = useDispatch();
  const { suggestedusers, user } = useSelector(store => store.auth);

  const [showAll, setShowAll] = useState(false); // toggle for "See All"
  const usersToShow = showAll ? suggestedusers : suggestedusers.slice(0, 5);

  const toggleFollow = async (id) => {
    try {
      const res = await axios.post(
        `https://instax-ln7e.onrender.com/api/v1/user/followorunfollow/${id}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        // ✅ Backend should return updated user with updated following list
        if (res.data.message) {
          dispatch(setAuthUser(user));
           const updatedFollowing = res.data.message === "Unfollowed successfully"
    ? user.following.filter(userId => userId !== id)
    : [...user.following, id];

  dispatch(setAuthUser({ ...user, following: updatedFollowing }));
        }

      }
    } catch (error) {
      toast.message("Can't follow/unfollow now");
      console.log(error);
    }
  };

  return (
    <div className='my-10'>
      <div className='flex items-center justify-between text-sm'>
        <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
        {suggestedusers.length > 5 && (
          <span
            onClick={() => setShowAll(prev => !prev)}
            className='font-medium cursor-pointer text-blue-500'
          >
            {showAll ? "Show Less" : "See All"}
          </span>
        )}
      </div>

      {usersToShow.map((userr) => (
        <div key={userr._id} className='flex items-center justify-between my-5'>
          <div className='flex items-center gap-2'>
            <Link to={`/profile/${userr?._id}`}>
              <Avatar>
                <AvatarImage src={userr?.profilePicture} alt="profile" />
                <AvatarFallback>{userr?.username?.charAt(0)?.toUpperCase() || "X"}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <h1 className='font-semibold text-sm'>
                <Link to={`/profile/${userr?._id}`}>{userr?.username}</Link>
              </h1>
              <span className='text-gray-600 text-sm'>
                {userr?.bio || 'Bio here...'}
              </span>
            </div>
          </div>
          <span
            onClick={() => toggleFollow(userr._id)}
            className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]'
          >
            {user?.following?.includes(userr._id) ? "Unfollow" : "Follow"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SuggestedUsers;
