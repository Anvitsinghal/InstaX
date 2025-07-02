import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import getuserprofile from '@/Hooks/usegetuserprofile';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AtSign, Heart, MessageCircle } from 'lucide-react';

const Profile = () => {
  const { id: userid } = useParams();
  getuserprofile(userid);
  const { userprofile, user } = useSelector(store => store.auth);
  const [activeTab, setActiveTab] = useState('posts');

  const isLoggedInUserProfile = user?._id === userprofile?._id;
  const isFollowing = false;

  const displayedPost = activeTab === 'posts' ? userprofile?.posts : userprofile?.bookmarks;

  return (
    <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
      {/* Top Section */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-gray-200 pb-10'>
        <div className='flex justify-center md:justify-end'>
          <Avatar className='h-32 w-32 md:h-40 md:w-40'>
            <AvatarImage src={userprofile?.profilePicture} alt="profile" />
            <AvatarFallback>X</AvatarFallback>
          </Avatar>
        </div>

        <div className='md:col-span-2 space-y-4'>
          <div className='flex flex-wrap items-center gap-3 text-lg font-semibold'>
            <span className="text-xl">{userprofile?.username}</span>
            {
              isLoggedInUserProfile ? (
                <>
                  <Link to="/account/edit">
                    <Button variant='secondary' className='h-8 px-3'>Edit Profile</Button>
                  </Link>
                  <Button variant='secondary' className='h-8 px-3'>View Archive</Button>
                  <Button variant='secondary' className='h-8 px-3'>Ad Tools</Button>
                </>
              ) : (
                isFollowing ? (
                  <>
                    <Button variant='secondary' className='h-8 px-3'>Unfollow</Button>
                    <Button variant='secondary' className='h-8 px-3'>Message</Button>
                  </>
                ) : (
                  <Button className='bg-[#0095F6] hover:bg-[#3192d2] h-8 px-4'>Follow</Button>
                )
              )
            }
          </div>

          <div className='flex gap-6 text-sm text-white-700'>
            <span><span className='font-bold'>{userprofile?.posts.length}</span> posts</span>
            <span><span className='font-bold'>{userprofile?.followers.length}</span> followers</span>
            <span><span className='font-bold'>{userprofile?.following.length}</span> following</span>
          </div>

          <div className='space-y-1'>
            <p className='font-medium'>{userprofile?.bio || 'Bio here...'}</p>
            <Badge variant='secondary' className='flex items-center gap-1 w-fit'>
              <AtSign className="h-4 w-4" />
              <span>{userprofile?.username}</span>
            </Badge>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className='mt-6'>
        <div className='flex justify-center gap-8 text-sm font-medium text-gray-600 border-b border-gray-200'>
          {['posts', 'saved', 'reels', 'tags'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 uppercase tracking-wide ${activeTab === tab ? 'border-b-2 border-black text-white' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 mt-6'>
          {displayedPost?.map(post => (
            <div key={post._id} className='relative group aspect-square'>
              <img
                src={post.image}
                alt='post'
                className='object-cover w-full h-full rounded-sm'
              />
              <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition'>
                <div className='flex items-center gap-6 text-white font-semibold'>
                  <div className='flex items-center gap-1'>
                    <Heart className='w-4 h-4' />
                    <span>{post.likes.length}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <MessageCircle className='w-4 h-4' />
                    <span>{post.comments.length}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {displayedPost?.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-10">No posts available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
