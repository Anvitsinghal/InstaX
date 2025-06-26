import React from 'react'
import Feed from './Feed'
import RightSideBar from './RightSideBar'
import { Outlet } from 'react-router-dom'
import getalllpost from '@/Hooks/getalllpost'
import getsuggestedusers from '@/Hooks/getsuggestedusers'

const Home = () => {
  getalllpost();
  getsuggestedusers();
  return (
       <div className='flex'>
            <div className='flex-grow'>
                <Feed />
                <Outlet />
            </div>
            <RightSideBar />
        </div>
  )
}

export default Home
