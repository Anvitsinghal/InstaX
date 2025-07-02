
import { setsuggesteduser } from "@/redux/Authslice";
import { setPosts } from "@/redux/Postslice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const getsuggestedusers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllPost = async () => {
            try {
                const res = await axios.get('https://instax-ln7e.onrender.com/api/v1/user/suggested', { withCredentials: true });
                if (res.data.success) { 
                    console.log(res.data.users);
                    dispatch(setsuggesteduser(res.data.users));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllPost();
    }, []);
};
export default getsuggestedusers;