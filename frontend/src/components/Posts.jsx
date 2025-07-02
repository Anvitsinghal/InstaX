import React from 'react';
import Post from './Post';
import { useSelector } from 'react-redux';

const Posts = () => {
  const { posts } = useSelector(store => store.post);

  return (
    <div className="w-full flex flex-col items-center gap-6 px-2 sm:px-4">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post key={post._id} post={post} />
        ))
      ) : (
        <p className="text-center text-gray-500 mt-10">No posts yet.</p>
      )}
    </div>
  );
};

export default Posts;
