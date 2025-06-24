import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { useSelector } from 'react-redux'
import Comment from './Comment'
import axios from 'axios'
import { toast } from 'sonner'

const CommentDialogue = ({open,setopen}) => {
  const [text,settext]=useState("");
  const changeeventhandler=(e)=>{
    const inputtext=e.target.value;
    if(inputtext.trim()){
        settext(inputtext);
    }
    else{
        settext("");
    }
  }
  const commenthandler=async()=>{
         try {
   const res = await axios.post(
  `http://localhost:8000/api/v1/post/${selectedposts?._id}/comment`,
  { text },
  {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  }
);
         if(res.data.success){
        
          toast.success(res.data.message);
          settext("");
         }
} catch (error) {
  console.log(error);
  toast.message("error");
}
  }
 const { selectedposts } = useSelector(store => store.post);

  return (
 <Dialog open={open}>
      <DialogContent onInteractOutside={() => setopen(false)} className="bg-white dark:bg-gray-900 text-black dark:text-white rounded-xl shadow-lg max-w-5xl p-0 flex flex-col">
        <div className='flex flex-1'>
          <div className='w-1/2'>
            <img
              onClick={()=>{console.log("Image URL:", selectedposts?.image);
}}
              src={selectedposts?.image} alt="post_img"
              className='w-full h-full object-cover rounded-l-lg'
            />
          </div>
          <div className='w-1/2 flex flex-col justify-between'>
            <div className='flex items-center justify-between p-4'>
              <div className='flex gap-3 items-center'>
                <Link>
                  <Avatar>
                    <AvatarImage src={selectedposts?.author?.profilePicture} />
                    <AvatarFallback>{"X"}</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                { <Link className='font-semibold text-xs'>{selectedposts?.author?.username}</Link> }
                   <span className='text-gray-600 text-sm'>BIO</span> 
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className='cursor-pointer' />
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center text-sm text-center">
                  <div className='cursor-pointer w-full text-[#ED4956] font-bold'>
                    Unfollow
                  </div>
                  <div className='cursor-pointer w-full'>
                    Add to favorites
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <hr />
            <div className='flex-1 overflow-y-auto max-h-96 p-4'>
              {
                selectedposts?.comments.map((comment)=><Comment ket={comment._id} comment={comment}/>)
              }
            </div>
            <div className='p-4'>
              <div className='flex items-center gap-2'>
                <input type="text"  value={text} onChange={changeeventhandler} placeholder='Add a comment...' className='w-full outline-none border text-sm border-gray-300 p-2 rounded' />
                <Button  disabled={!text.trim()} onClick={commenthandler} variant="outline">Send</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentDialogue
