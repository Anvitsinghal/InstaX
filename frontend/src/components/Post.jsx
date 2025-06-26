import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "./ui/button";
import { CiHeart } from "react-icons/ci";
import CommentDialogue from "./CommentDialogue";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setPosts, setselectedposts } from "@/redux/Postslice";
import { FaHeart } from "react-icons/fa6";
import { GiPawHeart } from "react-icons/gi";
import { Badge } from "./ui/badge";
const Post = ({ post }) => {
  
  const { user } = useSelector((store) => store.auth);
  const [postlike, setpostlike] = useState(post.likes.length);
  const [like, setlike] = useState(post.likes.includes(user?._id) || false);
  const dispatch = useDispatch();
  const { posts } = useSelector((store) => store.post);
 
  const [text, settext] = useState("");
  const [open, setopen] = useState(false);
  const [comment,setcomment]=useState(post.comments);
  const seteventhandler = (e) => {
    const inputtext = e.target.value;
    if (inputtext.trim()) {
      settext(inputtext);
    } else {
      settext("");
    }
    console.log(text);
  };
  const deleteposthandler = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/post/delete/${post._id}`,
        {
          withCredentials: true,
        }
      );

      // console.log(res);
      if (res.data.success) {
        const updatedposts = posts.filter(
          (postitem) => postitem._id != post?._id
        );
        dispatch(setPosts(updatedposts));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.message("try after sometime");
    }
  };
  const likedordisliked = async () => {
    try {
     
      const action = like ? "dislike" : "like";
      const res = await axios.get(
        `http://localhost:8000/api/v1/post/${post._id}/${action}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedlikes = like ? postlike - 1 : postlike + 1;
        setpostlike(updatedlikes);
        setlike(!like);
        const updatedpostdata=posts.map(p=>
          p._id==post._id?{
            ...p,
            likes:like?p.likes.filter(id=>id!=user._id):[...p.likes,user._id]
          }:p
        )
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const commenthandler=async()=>{
         try {
   const res = await axios.post(
  `http://localhost:8000/api/v1/post/${post._id}/comment`,
  { text },
  {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  }
);
         if(res.data.success){
          const updatedcommentdata=[...comment,res.data.comment ]
          setcomment(updatedcommentdata);
          const updatedpost=posts.map(p=>p._id==post._id?{...p,comment:updatedcommentdata}:p);
          dispatch(setPosts(updatedpost))
          toast.success(res.data.message);
          settext("");
         }
} catch (error) {
  console.log(error);
  toast.message("error");
}
  }
  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={post.author?.profilePicture} alt="post_image" />
            <AvatarFallback>{"X"}</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-3">
          <h1>{post.author?.username}</h1>
          {user?._id==post?.author?._id && <Badge variant={"Verified"}>Author</Badge>}
          </div>
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

            {user && user?._id === post?.author?._id && (
              <Button
                onClick={deleteposthandler}
                variant="ghost"
                className="cursor-pointer w-fit"
              >
                Delete
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <img
        className="rounded-sm my-2 w-full aspect-square object-cover"
        src={post.image}
        alt="image"
      />
      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-3">
       
{
  like?<GiPawHeart color="red" onClick={likedordisliked} size={"32px"}/>:<CiHeart onClick={likedordisliked} size={"32px"} />
}


          <MessageCircle
            onClick={() =>{dispatch(setselectedposts(post)); setopen(true)}}
            className="cursor-pointer hover:text-gray-600"
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark className="cursor-pointer hover:text-gray-600" />
      </div>
      <span className="font-medium block mb-2">{postlike} likes</span>
      <p>
        <span className="font-medium mr-2">{post.author.username}</span>
        {post.caption}
      </p>
      <span
          onClick={() =>{dispatch(setselectedposts(post)); setopen(true)}}
        className="cursor-pointer text-sm text-gray-400"
      >
        View All {comment.length}comments
      </span>
      <CommentDialogue open={open} setopen={setopen} />
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={seteventhandler}
          className="outline-none text-sm w-full"
        />
        {text && <span onClick={commenthandler} className="text-[#3BADF8] cursor-pointer">Post</span>}
      </div>
    </div>
  );
};

export default Post;
