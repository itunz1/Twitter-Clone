import {DotsHorizontalIcon} from '@heroicons/react/outline'
import {ChatIcon} from '@heroicons/react/outline'
import {TrashIcon} from '@heroicons/react/outline'
import {HeartIcon} from '@heroicons/react/outline'
import {ShareIcon} from '@heroicons/react/outline'
import {ChartBarIcon} from '@heroicons/react/outline'
import Moment from 'react-moment'



function Posts({ post }) {
  return (
    <div className='flex p-3 border-b border-gray-200 cursor-pointer'>
        <img className='mr-4 h-11 w-11 rounder-full' src={post.data().userImg} alt="user-img"/>
    <div className="">

        <div className="flex items-center justify-between">

            <div className="flex items-center space-x-1 whitespace-nowrap">
                <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>{post.data().name}</h4>
                <span className='text-sm sm:text-[15px]'>@{post.data().username} -</span>
                <span className='text-sm sm:text-[15px] hover:underline'><Moment fromNow>{post?.timestamp?.toDate()}</Moment></span>
            </div>
            <DotsHorizontalIcon className='w-10 h-10 p-2 hoverEffect hover:bg-sky-100 hover:text-sky-500'/>

        </div>
        <p className='text-gray-800 text-[15px] sm:text-[16px] mb-2'>{post.data().text}</p>
        <img className='mr-2 rounded-2xl' src={post.data().image} alt='post-img' />

        <div className='flex justify-between p-2 text-gray-500'>
        <ChatIcon className='p-2 h-9 w-9 hoverEffect hover:text-sky-500 hover:bg-sky-100'/>
        <TrashIcon className='p-2 h-9 w-9 hoverEffect hover:text-red-600 hover:bg-red-100'/>
        <HeartIcon className='p-2 h-9 w-9 hoverEffect hover:text-red-600 hover:bg-red-100'/>
        <ShareIcon className='p-2 h-9 w-9 hoverEffect hover:text-sky-500 hover:bg-sky-100'/>
        <ChartBarIcon className='p-2 h-9 w-9 hoverEffect hover:text-sky-500 hover:bg-sky-100'/>
        </div>

    </div>

    </div>
  )
}

export default Posts