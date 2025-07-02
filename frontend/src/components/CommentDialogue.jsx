import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { useSelector } from 'react-redux';
import Comment from './Comment';
import axios from 'axios';
import { toast } from 'sonner';

const CommentDialogue = ({ open, setopen }) => {
  const [text, settext] = useState('');
  const { selectedposts } = useSelector(store => store.post);

  const changeeventhandler = (e) => {
    const inputtext = e.target.value;
    settext(inputtext.trim() ? inputtext : '');
  };
  const {user}=useSelector(store=>store.auth);
  const commenthandler = async () => {
    try {
      const res = await axios.post(
        `https://instax-ln7e.onrender.com/${selectedposts?._id}/comment`,
        { text },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        settext('');
      }
    } catch (error) {
      console.log(error);
      toast.message('Error');
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setopen(false)}
        className="bg-white dark:bg-zinc-900 text-black dark:text-white rounded-xl shadow-lg w-full max-w-5xl p-0 md:flex flex-col md:flex-row overflow-hidden"
      >
        {/* Image Section */}
        <div className="md:w-1/2 w-full">
          <img
            src={selectedposts?.image}
            alt="post_img"
            className="w-full h-72 md:h-full object-cover"
          />
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 w-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b dark:border-zinc-700">
            <div className="flex gap-3 items-center">
              <Link>
                <Avatar>
                  <AvatarImage src={selectedposts?.author?.profilePicture} />
                  <AvatarFallback>{selectedposts?.author?.username?.charAt(0)?.toUpperCase() || 'X'}</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <Link className="font-semibold text-sm">{selectedposts?.author?.username}</Link>
                <p className="text-gray-500 text-xs">{selectedposts?.author?.bio}</p>
              </div>
            </div>

           
          </div>

          {/* Comments */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 max-h-72 md:max-h-[400px]">
            {selectedposts?.comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </div>

          {/* Comment Input */}
          <div className="border-t dark:border-zinc-700 p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={text}
                onChange={changeeventhandler}
                placeholder="Add a comment..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded text-sm bg-transparent outline-none"
              />
              <Button
                onClick={commenthandler}
                disabled={!text.trim()}
                className="text-sm"
                variant="outline"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialogue;
