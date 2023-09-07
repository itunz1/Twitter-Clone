import { db, storage } from '@/firebase'
import { PhotographIcon, XIcon } from '@heroicons/react/outline'
import { EmojiHappyIcon } from '@heroicons/react/outline'
import { addDoc, collection, serverTimestamp, doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { useSession, signOut } from 'next-auth/react'
import { useRef, useState } from 'react'

function Input() {
    const { data: session } = useSession();
    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const filePickerRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const sendPost = async () => {
        if (loading) return;
        setLoading(true);

        const docRef = await addDoc(collection(db, "posts"), {
            id: session.user.uid,
            text: input,
            userImg: session.user.image,
            timestamp: serverTimestamp(),
            name: session.user.name,
            username: session.user.username,
        });

        const imageRef = ref(storage, `posts/${docRef.id}/image`)

        if (selectedFile) {
            await uploadString(imageRef, selectedFile, "data_url").then(async () => {
                const downloadURL = await getDownloadURL(imageRef)
                await updateDoc(doc(db, "posts", docRef.id), {
                    image: downloadURL,
                })
            })
            setInput("");
            setSelectedFile(null);
            setLoading(false);
        }
    }

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result)
        }
    }

    return (
        <>
            {session && (
                <div className='flex p-3 space-x-3 border-b border-gray-200'>
                    <img src={session.user.image} alt="user-img"
                        className='rounded-full cursor-pointer h-11 w-11 hover:brightness-95'
                        onClick={signOut}
                    />
                    <div className='w-full divide-y divide-gray-200'>
                        <div className=''>
                            <textarea
                                className='w-full text-lg tracking-wide border-none focus:ring-0 placeholder:gray-700 min-h-[50px] text-gray-700'
                                rows='2'
                                placeholder="What's happening?"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                        {selectedFile && (
                            <div className='relative'>
                                <XIcon className='absolute rounded-full shadow-md cursor-pointer h-7 shadow-white' onClick={() => setSelectedFile(null)} />
                                <img src={selectedFile} className={`${loading && "animate-pulse"}`} />
                            </div>
                        )}
                        <div className='flex items-center justify-between pt-2.5'>
                            {!loading && (
                                <>
                                    <div className='flex'>
                                        <div className='' onClick={() => filePickerRef.current.click()}>
                                            <PhotographIcon className='w-10 h-10 p-2 hoverEffect text-sky-500 hover:bg-sky-100' />
                                            <input type='file' hidden ref={filePickerRef} onChange={addImageToPost} />
                                        </div>
                                        <EmojiHappyIcon className='w-10 h-10 p-2 hoverEffect text-sky-500 hover:bg-sky-100' />
                                    </div>
                                    <button
                                        className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'
                                        disabled={!input.trim()}
                                        onClick={sendPost}
                                    >
                                        Tweet
                                    </button>
                                </>
                            )}
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}

export default Input