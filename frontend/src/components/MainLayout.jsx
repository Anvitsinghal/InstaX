import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'
import Chatbot from './Chatbot'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <LeftSidebar/>
      <div>
        <Outlet></Outlet>
      </div>
      <Chatbot/>
    </div>
  )
}

export default MainLayout
