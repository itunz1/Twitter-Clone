import {SparklesIcon} from '@heroicons/react/outline'
import Input from './Input'
import Posts from './Posts'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';
import { AnimatePresence, motion } from 'framer-motion';

function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
     return onSnapshot(query(collection(db, "posts"),
        orderBy("timestamp", "desc")), 
        (snapshot) => {
            setPosts(snapshot.docs)
        }
      )
    }, [])
    
    return (
        <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
           <div className="sticky top-0 z-50 flex items-center px-3 py-2 bg-white border-b border-gray-200">
            <h2 className='text-lg font-bold cursor-pointer sm:text-xl'>Home</h2>
            <div className="flex items-center justify-center px-0 ml-auto hoverEffect w-9 h-9">
                <SparklesIcon className='h-5'/>
            </div>
           </div>
           <Input/>
           <AnimatePresence>
           {posts.map(e => (
            <motion.div 
            key={e.id} 
            initial={{opacity: 0}} 
            animate={{opacity: 1}} 
            exit={{opacity: 0}}
            transition={{duration: 1}}
            >
            <Posts key={e.id} post={e} id={e.id}/>
            </motion.div>
           ))}
           </AnimatePresence>
        </div>
    )
}

export default Feed