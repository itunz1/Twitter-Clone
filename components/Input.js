import { PhotographIcon } from '@heroicons/react/outline'
import { EmojiHappyIcon } from '@heroicons/react/outline'

function Input() {
    return (
        <div className='flex p-3 space-x-3 border-b border-gray-200'>
            <img src="https://pbs.twimg.com/profile_images/1186403099776184320/K3LAbzc9_400x400.png" alt="user-img"
                className='rounded-full cursor-pointer h-11 w-11 hover:brightness-95'
            />
            <div className='w-full divide-y divide-gray-200'>
                <div className=''>
                    <textarea className='w-full text-lg tracking-wide border-none focus:ring-0 placeholder:gray-700 min-h-[50px] text-gray-700' rows='2' placeholder="What's happening?" />
                </div>
                <div className='flex items-center justify-between pt-2.5'>
                    <div className='flex'>
                        <PhotographIcon className='w-10 h-10 p-2 hoverEffect text-sky-500 hover:bg-sky-100' />
                        <EmojiHappyIcon className='w-10 h-10 p-2 hoverEffect text-sky-500 hover:bg-sky-100' />
                    </div>
                    <button className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'>
                        Tweet
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Input