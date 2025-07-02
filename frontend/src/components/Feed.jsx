import React from 'react';
import Posts from './Posts';

const Feed = () => {
  return (
    <div
      className="
        flex-1 
        my-8 
        flex 
        flex-col 
        items-center 
        px-4 
        sm:px-8 
        md:pl-[20%] 
        transition-all
      "
    >
      <div className="w-full max-w-2xl space-y-6">
        <Posts />
      </div>
    </div>
  );
};

export default Feed;
