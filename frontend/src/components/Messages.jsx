import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { useSelector } from 'react-redux'
import getallmessage from '@/Hooks/usegetallmessage'
import realtimemessage from '@/Hooks/getrealtime'

const Messages = ({selecteduser}) => {
    realtimemessage();
    const {user}=useSelector(store=>store.auth);
  getallmessage();
  const {messages=[]}=useSelector(store=>store.chat);
  return (
     <div className='overflow-y-auto flex-1 p-4'>
            <div className='flex justify-center'>
                <div className='flex flex-col items-center justify-center'>
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={selecteduser?.profilePicture} alt='profile' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>{selecteduser?.username}</span>
                    <Link to={`/profile/${selecteduser?._id}`}><Button className="h-8 my-2" variant="secondary">View profile</Button></Link>
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                {
                 (messages||[]).map((msg, idx)=>{
                    return(
                        <div className={`flex ${msg.senderId===user?._id?'justify-end':'justify-start'}` } key={idx} >
                                 <div>
                                    {typeof msg === 'string' ? msg : msg.message}
                                 </div>
                        </div>
                    )
                  })
                }

            </div>
        </div>  
  )
}

export default Messages
