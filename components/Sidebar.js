import Image from "next/image"
import SidebarMenuItems from "./SidebarMenuItems"
import { HomeIcon } from '@heroicons/react/solid'
import { HashtagIcon } from '@heroicons/react/outline'
import { BellIcon } from '@heroicons/react/outline'
import { InboxIcon } from '@heroicons/react/outline'
import { BookmarkIcon } from '@heroicons/react/outline'
import { ClipboardIcon } from '@heroicons/react/outline'
import { UserIcon } from '@heroicons/react/outline'
import { DotsCircleHorizontalIcon } from '@heroicons/react/outline'
import { DotsHorizontalIcon } from '@heroicons/react/outline'


function SideBar() {
  return (
    <div className="fixed flex-col hidden h-full p-2 sm:flex xl:items-start xl:ml-24">
      <div className="p-0 hoverEffect hover:bg-blue-100 xl:px-1">
        <Image src="https://img.freepik.com/premium-vector/new-twitter-logo-x-2023-twitter-x-logo-vector-download_691560-10809.jpg?w=826" width="50" height="50" alt="logo" />
      </div>

      <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItems text="Home" Icon={HomeIcon} active/>
        <SidebarMenuItems text="Explore" Icon={HashtagIcon} />
        <SidebarMenuItems text="Notifications" Icon={BellIcon} />
        <SidebarMenuItems text="Messages" Icon={InboxIcon} />
        <SidebarMenuItems text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarMenuItems text="Lists" Icon={ClipboardIcon} />
        <SidebarMenuItems text="Profile" Icon={UserIcon} />
        <SidebarMenuItems text="More" Icon={DotsCircleHorizontalIcon} />
      </div>

      <button className="hidden w-56 h-12 text-lg font-bold text-white bg-blue-400 rounded-full shadow-sm hover:brightness-95 xl:inline">
        Tweet
        </button>

      <div className="flex items-center justify-center mt-auto text-gray-700 hoverEffect xl:justify-start">
        <img className="w-24 h-24 rounded-full"
        src="https://pbs.twimg.com/profile_images/1186403099776184320/K3LAbzc9_400x400.png" alt="user img" />
        <div className="hidden leading-5 xl:inline">
          <h4 className="font-bold">Jose Lezama</h4>
          <p className="text-gray-500 xl:mr-2">@codewithJL</p>
        </div>
        <DotsHorizontalIcon className="hidden h-5 xl:ml-8 xl:inline" />
      </div>
    </div>
  )
}

export default SideBar