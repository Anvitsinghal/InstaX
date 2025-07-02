import { setmessages } from "@/redux/chatslice";
import { setPosts } from "@/redux/Postslice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const getallmessage = () => {
    const dispatch = useDispatch();
    const {selecteduser}=useSelector(store=>store.auth);
    useEffect(() => {
        const fetchAllPost = async () => {
            try {
                const res = await axios.get(`https://instax-ln7e.onrender.com/api/v1/message/all/${selecteduser?._id}`, { withCredentials: true });
                if (res.data.success) { 
                    console.log(res.data.messages);
                    dispatch(setmessages(res.data.messages || []));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllPost();
    }, [selecteduser?._id]);
};
export default getallmessage;