import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "./ui/button";
import { CiHeart } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import CommentDialogue from "./CommentDialogue";
import { useSelector } from "react-redux";
const Post = ({post}) => {
  const {user}=useSelector(store=>store.auth);
    const [text,settext]=useState("");
    const [open,setopen]=useState(false);
    const seteventhandler=(e)=>{
        const inputtext=e.target.value;
        if(inputtext.trim()){
        settext(inputtext);
        }
        else{
            settext("");
        }
        console.log(text);
    }
  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={post.author?.profilePicture} alt="post_image" />
            <AvatarFallback>{"X"}</AvatarFallback>
          </Avatar>
          <h1>{post.author?.username}</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="bg-white dark:bg-gray-900 text-black dark:text-white rounded-xl shadow-lg flex flex-col items-center text-sm text-center">
            <Button
              variant="ghost"
              className="cursor-pointer w-fit text-[#ED4956] font-bold"
            >
              Unfollow
            </Button>

            <Button variant="ghost" className="cursor-pointer w-fit">
              Add to favorites
            </Button>

           
              {user && user?._id===post?.author?._id&& <Button variant="ghost" className="cursor-pointer w-fit">Delete</Button>}
            
          </DialogContent>
        </Dialog>
      </div>
      <img  className='rounded-sm my-2 w-full aspect-square object-cover' src={post.image} alt="image" />
      <div className='flex items-center justify-between my-2'>
      <div className='flex items-center gap-3'>
      <CiHeart size={'32px'}/>
      <MessageCircle onClick={()=>setopen(true)} className='cursor-pointer hover:text-gray-600' />
      <Send className='cursor-pointer hover:text-gray-600' />
       </div>
      <Bookmark className='cursor-pointer hover:text-gray-600' />
     </div>
      <span className='font-medium block mb-2'>{post.likes.length} likes</span>
       <p>
            <span className='font-medium mr-2'>{post.author.username}</span>
            {post.caption}
            </p>
            <span onClick={()=>setopen(true)} className='cursor-pointer text-sm text-gray-400'>View All comments</span>
            <CommentDialogue open={open} setopen={setopen}/>
            <div className="flex items-center justify-between">
                <input
                  type="text"
                    placeholder='Add a comment...'
                    value={text}
                    onChange={seteventhandler}
                    className='outline-none text-sm w-full'
                />
                { text &&
                <span className='text-[#3BADF8] cursor-pointer'>Post</span>
}
            </div>
    </div>
  );
};

export default Post;
