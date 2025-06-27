import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarImage } from './ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';

import { Button } from './ui/button';
import { MessageCircleCode } from 'lucide-react';
import { Input } from './ui/input';
import { setselecteduser } from '@/redux/Authslice';
import Messages from './Messages';
import axios from 'axios';
import { setmessages } from '@/redux/chatslice';


const Chatpage = () => {
    const [textmessage,settextmessage]=useState("");
    const dispatch=useDispatch();
    const {onlineusers,messages=[]}=useSelector(store=>store.chat);
    const {user,suggestedusers,selecteduser}=useSelector(store=>store.auth);
   // const {suggesteduser}=useSelector(store=>store.auth);
   const sendMessageHandler=async(receiverid)=>{
        try {
            const res=await axios.post(`http://localhost:8000/api/v1/message/send/${receiverid}`,{
                textmessage
            },{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                dispatch(setmessages([...(messages||[]),res.data.newMessage]));
                settextmessage("");
            }
        } catch (error) {
            console.log(error);
        }
   }
   useEffect(()=>{
    dispatch(setselecteduser(null));
   },[]);
   

  return (
     <div className='flex ml-[16%] h-screen'>
            <section className='w-full md:w-1/4 my-8'>
                <h1 className='font-bold mb-4 px-3 text-xl'>{user?.username}</h1>
                <hr className='mb-4 border-gray-300' />
                <div className='overflow-y-auto h-[80vh]'>
                    {
                        suggestedusers.map((suggestedUser) => {
                           const isonline=onlineusers.includes(suggestedUser?._id);
                            return (
                                <div onClick={() => dispatch(setselecteduser(suggestedUser))} className='flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer'>
                                    <Avatar className='w-14 h-14'>
                                        <AvatarImage src={suggestedUser?.profilePicture} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-col'>
                                        <span className='font-medium'>{suggestedUser?.username}</span>
                                        <span className={`text-xs font-bold ${isonline ? 'text-green-600' : 'text-red-600'} `}>{isonline ? 'online' : 'offline'}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </section>
            {
                selecteduser ? (
                    <section className='flex-1 border-l border-l-gray-300 flex flex-col h-full'>
                        <div className='flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10'>
                            <Avatar>
                                <AvatarImage src={selecteduser?.profilePicture} alt='profile' />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                                <span>{selecteduser?.username}</span>
                            </div>
                        </div>
                        <Messages selecteduser={selecteduser}/>
                        <div className='flex items-center p-4 border-t border-t-gray-300'>
                            <Input value={textmessage} onChange={(e)=>settextmessage(e.target.value)} type="text" className='flex-1 mr-2 focus-visible:ring-transparent' placeholder="Messages..." />
                            <Button onClick={() => sendMessageHandler(selecteduser?._id)}>Send</Button>
                        </div>
                    </section>
                ) : (
                    <div className='flex flex-col items-center justify-center mx-auto'>
                        <MessageCircleCode className='w-32 h-32 my-4' />
                        <h1 className='font-medium'>Your messages</h1>
                        <span>Send a message to start a chat.</span>
                    </div>
                )
            }
        </div>
    )
}

export default Chatpage