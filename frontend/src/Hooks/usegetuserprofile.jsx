
import { setsuggesteduser, setuserprofile } from "@/redux/Authslice";
import { setPosts } from "@/redux/Postslice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const getuserprofile = (userid) => {
    const dispatch = useDispatch();
   
    useEffect(() => {
        const fetchAllPost = async () => {
            try {
                const res = await axios.get(`https://instax-ln7e.onrender.com/api/v1/user/${userid}/profile`, { withCredentials: true });
                if (res.data.success) { 
                    console.log(res.data.user);
                    dispatch(setuserprofile(res.data.user));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllPost();
    }, [userid]);
};
export default getuserprofile;