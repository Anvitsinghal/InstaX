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
import { setAuthUser } from "@/redux/Authslice";
import { GoBookmarkFill } from "react-icons/go";

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
const toggleFollow = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/followorunfollow/${id}`,
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
  const [bookmarked, setBookmarked] = useState(user?.bookmarks?.includes(post?._id));

const toggleBookmark = async () => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/v1/post/${post._id}/bookmark`,
      {},
      { withCredentials: true }
    );
    if (res.data.success) {
      setBookmarked(prev => !prev);
      toast.success(res.data.message);
      
    }
  } catch (err) {
    toast.error("Bookmark error");
    console.log(err);
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
  <div className="w-full max-w-lg mx-auto my-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300">
    
    {/* Top bar */}
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={post.author?.profilePicture} alt="profile" />
          <AvatarFallback>{post.author?.username?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-white font-semibold text-sm">{post.author?.username}</h2>
          {user?._id === post?.author?._id && (
            <Badge variant="secondary" className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-md">Author</Badge>
          )}
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <MoreHorizontal className="text-gray-300 hover:text-white cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="bg-zinc-800 text-white rounded-xl shadow-2xl">
         {user?._id != post?.author?._id && ( <Button onClick={()=>{toggleFollow(post?.author?._id)}} variant="ghost" className="w-full text-red-500"> {user?.following?.includes(post?.author?._id) ? "Unfollow" : "Follow"}</Button>)}
          <Button variant="ghost" className="w-full">Add to favorites</Button>
          {user && user?._id === post?.author?._id && (
            <Button onClick={deleteposthandler} variant="ghost" className="w-full text-red-400">Delete</Button>
          )}
        </DialogContent>
      </Dialog>
    </div>

    {/* Image */}
    <img src={post.image} alt="post" className="w-full aspect-square object-cover" />

    {/* Icons */}
    <div className="flex items-center justify-between px-4 py-3 text-white">
      <div className="flex items-center gap-5">
        {like ? (
          <GiPawHeart onClick={likedordisliked} size={26} className="text-red-500 cursor-pointer" />
        ) : (
          <CiHeart onClick={likedordisliked} size={26} className="hover:text-gray-400 cursor-pointer" />
        )}
        <MessageCircle
          onClick={() => {
            dispatch(setselectedposts(post));
            setopen(true);
          }}
          size={24}
          className="hover:text-gray-400 cursor-pointer"
        />
        <Send size={22} className="hover:text-gray-400 cursor-pointer" />
      </div>
     {user?.bookmarks?.includes(post?._id) ? (
  <GoBookmarkFill
    onClick={toggleBookmark}
    size={22}
    className="text-yellow-400 hover:text-gray-400 cursor-pointer"
  />
) : (
  <Bookmark
    onClick={toggleBookmark}
    size={22}
    className="hover:text-gray-400 cursor-pointer"
  />
)}

    </div>

    {/* Like count */}
    <p className="text-white px-4 text-sm font-medium">{postlike} likes</p>

    {/* Caption */}
    <p className="text-white px-4 text-sm mb-2">
      <span className="font-semibold mr-2">{post.author.username}</span>
      {post.caption}
    </p>

    {/* Comments link */}
    <p
      onClick={() => {
        dispatch(setselectedposts(post));
        setopen(true);
      }}
      className="px-4 text-gray-400 text-sm cursor-pointer hover:underline"
    >
      View all {comment.length} comments
    </p>

    {/* Comment input */}
    <div className="px-4 py-3 border-t border-zinc-800 flex items-center gap-3">
      <input
        type="text"
        placeholder="Add a comment..."
        value={text}
        onChange={seteventhandler}
        className="bg-transparent text-sm w-full text-white placeholder-gray-400 focus:outline-none"
      />
      {text && (
        <span onClick={commenthandler} className="text-blue-500 text-sm cursor-pointer font-medium">Post</span>
      )}
    </div>

    <CommentDialogue open={open} setopen={setopen} />
  </div>
);

};

export default Post;
