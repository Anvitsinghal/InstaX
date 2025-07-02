import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { readfileasdataurl } from "@/lib/utils";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/redux/Postslice";

const CreatePost = ({ open, setopen }) => {
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const imageref = useRef();
  const [file, setfile] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setloading] = useState(false);
  const [imagepreview, setimagepreview] = useState("");

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setfile(file);
      const dataurl = await readfileasdataurl(file);
      setimagepreview(dataurl);
    }
  };

  const createPostHandler = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("caption", caption);
    if (imagepreview) formdata.append("image", file);
    try {
      setloading(true);
      const res = await axios.post(
        "https://instax-ln7e.onrender.com/api/v1/post/addpost",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts]));
        toast.success(res.data.message);
        setopen(false);
        setCaption("");
        setimagepreview("");
        setfile("");
      }
    } catch (error) {
      console.log(error);
      toast.message("Error posting");
    } finally {
      setloading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setopen(false)}
        className="max-w-lg w-full bg-zinc-900 text-white border border-white/10 shadow-2xl"
      >
        <DialogTitle className="text-indigo-400">{user?.username}</DialogTitle>
        <DialogHeader className="text-center font-semibold text-xl mb-4">
          Create New Post
        </DialogHeader>

        <div className="flex gap-4 items-center mb-2">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user?.profilePicture} alt="img" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-sm">{user?.username}</h1>
            <span className="text-gray-400 text-xs">{user?.bio}</span>
          </div>
        </div>

        <Textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="bg-zinc-800 border border-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0 text-white"
          placeholder="Write a caption..."
        />

        {imagepreview && (
          <div className="w-full h-64 rounded-lg overflow-hidden border border-white/10 mt-4">
            <img
              src={imagepreview}
              alt="preview_img"
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <input
          ref={imageref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={fileChangeHandler}
        />

        <div className="mt-4 flex flex-col gap-3">
          <Button
            onClick={() => imageref.current.click()}
            className="bg-indigo-600 hover:bg-indigo-700 transition-all"
          >
            Select from computer
          </Button>

          {imagepreview && (
            loading ? (
              <Button disabled className="bg-indigo-700 flex gap-2">
                <Loader2 className="animate-spin h-5 w-5" />
                Posting...
              </Button>
            ) : (
              <Button
                onClick={createPostHandler}
                type="submit"
                className="bg-green-600 hover:bg-green-700 transition-all"
              >
                Post
              </Button>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
