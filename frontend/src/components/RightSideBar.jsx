import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SuggestedUsers from './SuggestedUsers';
import { Menu } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent } from './ui/sheet';

const RightSideBar = () => {
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);

  const sidebarContent = (
    <div className="w-72 p-4 my-4 rounded-2xl bg-black h-full overflow-y-auto">
      <div className="flex flex-col items-center gap-3">
        <Link to={`/profile/${user?._id}`}>
          <Avatar className="w-20 h-20">
            <AvatarImage src={user?.profilePicture} alt="profile" />
            <AvatarFallback>
              {user?.username?.charAt(0)?.toUpperCase() || 'X'}
            </AvatarFallback>
          </Avatar>
        </Link>

        <div className="text-center">
          <h1 className="font-semibold text-lg text-blue-600 hover:underline">
            <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
          </h1>
          <p className="text-sm text-gray-400">
            {user?.bio || 'This user has no bio yet...'}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <SuggestedUsers />
      </div>
    </div>
  );

  return (
    <>
      {/* ✅ Mobile: Hamburger top-right */}
      <div className="fixed top-4 right-4 z-50 block md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Menu
              className="text-white cursor-pointer hover:text-blue-400"
              size={28}
            />
          </SheetTrigger>
          <SheetContent side="right" className="bg-black text-white p-0">
            {sidebarContent}
          </SheetContent>
        </Sheet>
      </div>

      {/* ✅ Desktop: Show sidebar normally */}
      <div className="hidden md:block">{sidebarContent}</div>
    </>
  );
};

export default RightSideBar;
