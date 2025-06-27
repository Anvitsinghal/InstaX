import { setmessages } from "@/redux/chatslice";
import { setPosts } from "@/redux/Postslice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const realtimemessage = () => {
    const dispatch = useDispatch();
    const {messages}=useSelector(store=>store.chat);
    const {socket}=useSelector(store=>store.socketio)
    useEffect(() => {
       socket?.on('newmessage',(newMessage)=>{
        dispatch(setmessages([...messages,newMessage]));
       })
       return ()=>{
        socket?.off('newmessage');
       }
    }, [messages,dispatch]);
};
export default realtimemessage;