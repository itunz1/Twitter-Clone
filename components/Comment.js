import { db, storage } from '@/firebase'
import { DotsHorizontalIcon } from '@heroicons/react/outline'
import { ChatIcon } from '@heroicons/react/outline'
import { TrashIcon } from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import { ShareIcon } from '@heroicons/react/outline'
import { ChartBarIcon } from '@heroicons/react/outline'
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { deleteObject, ref } from 'firebase/storage'
import { useRecoilState, } from 'recoil'
import { modalState, postIdState } from '@/atom/modalAtom'
import { useRouter } from 'next/router'



function Comment({ comment, commentId, originalPostId }) {

  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const router = useRouter();


  useEffect(() => {
    onSnapshot(collection(db, "posts", originalPostId, "comments", commentId, "likes"),
      (snapshot) => setLikes(snapshot.docs))
  }, [db, originalPostId, commentId]);

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1)
  }, [likes]);


  async function likeComment() {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", originalPostId, "comments", commentId, "likes", session?.user.uid))
      } else {
        await setDoc(doc(db, "posts", originalPostId, "comments", commentId, "likes", session?.user.uid), {
          username: session.user.username,
        })
      }
    } else {
      signIn()
    }
  };

  async function deleteComment() {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteDoc(doc(db, "posts", originalPostId, "comments", commentId))
    }
  }

  return (
    <div className='flex p-3 pl-20 border-b border-gray-200 cursor-pointer'>
      <img className='mr-4 rounded-full h-11 w-11' src={comment?.userImg} alt="user-img" />
      <div className="flex-1">

        <div className="flex items-center justify-between">

          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>{comment?.name}</h4>
            <span className='text-sm sm:text-[15px]'>@{comment?.username} -</span>
            <span className='text-sm sm:text-[15px] hover:underline'><Moment fromNow>{comment?.timestamp?.toDate()}</Moment></span>
          </div>
          <DotsHorizontalIcon className='w-10 h-10 p-2 hoverEffect hover:bg-sky-100 hover:text-sky-500' />

        </div>
        <p className='text-gray-800 text-[15px] sm:text-[16px] mb-2'>{comment?.comment}</p>

        <div className='flex justify-between p-2 text-gray-500'>
          <div className='flex items-center select-none'>
            <ChatIcon onClick={() => {
              if (!session) {
                signIn();
              } else {
                setPostId(originalPostId)
                setOpen(!open);
              }
            }}
              className='p-2 h-9 w-9 hoverEffect hover:text-sky-500 hover:bg-sky-100'
            />
          </div>

          {session?.user.uid === comment?.userId && (
            <TrashIcon onClick={deleteComment} className='p-2 h-9 w-9 hoverEffect hover:text-red-600 hover:bg-red-100' />
          )}
          <div className='flex items-center'>
            {hasLiked ?
              (<HeartIconFilled onClick={likeComment} className='p-2 text-red-600 h-9 w-9 hoverEffect hover:bg-red-100' />) :
              (<HeartIcon onClick={likeComment} className='p-2 h-9 w-9 hoverEffect hover:text-red-600 hover:bg-red-100' />)}
            {likes.length > 0 && (
              <span className={`${hasLiked && "text-red-600"} text-sm select-none`}>{likes.length}</span>
            )
            }
          </div>
          <ShareIcon className='p-2 h-9 w-9 hoverEffect hover:text-sky-500 hover:bg-sky-100' />
          <ChartBarIcon className='p-2 h-9 w-9 hoverEffect hover:text-sky-500 hover:bg-sky-100' />
        </div>

      </div>

    </div>
  )
}

export default Comment