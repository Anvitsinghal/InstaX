
import { setPosts } from "@/redux/Postslice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const getalllpost = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllPost = async () => {
            try {
                const res = await axios.get('https://instax-ln7e.onrender.com/api/v1/post/all', { withCredentials: true });
                if (res.data.success) { 
                    console.log(res.data.posts);
                    dispatch(setPosts(res.data.posts));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllPost();
    }, []);
};
export default getalllpost;