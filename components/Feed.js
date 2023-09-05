import {SparklesIcon} from '@heroicons/react/outline'
import Input from './Input'
import Posts from './Posts'

function Feed() {
    const posts = [
        {
            id: "1",
            name: "Jose Lezama",
            userName: "Itun",
            userImg: "https://pbs.twimg.com/profile_images/1186403099776184320/K3LAbzc9_400x400.png",
            img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
            text: "Ready to work",
            timestamp: "3 hours ago",
        },
        {
            id: "2",
            name: "Carlos Miles",
            userName: "Carl",
            userImg: "https://pbs.twimg.com/profile_images/1186403099776184320/K3LAbzc9_400x400.png",
            img: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            text: "Having fun with some friends",
            timestamp: "1 hours ago",
        },
    ]

    return (
        <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
           <div className="sticky top-0 z-50 flex items-center px-3 py-2 bg-white border-b border-gray-200">
            <h2 className='text-lg font-bold cursor-pointer sm:text-xl'>Home</h2>
            <div className="flex items-center justify-center px-0 ml-auto hoverEffect w-9 h-9">
                <SparklesIcon className='h-5'/>
            </div>
           </div>
           <Input/>
           {posts.map(e => (
            <Posts key={e.id} post={e}/>
           ))}
        </div>
    )
}

export default Feed