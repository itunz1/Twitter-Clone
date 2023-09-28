import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { db } from "@/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

function Signin() {

    const router = useRouter();

    const onGoogleClick = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            const user = auth.currentUser.providerData[0];
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    username: user.displayName.split(" ").join("").toLowerCase(),
                    userImg: user.photoURL,
                    uid: user.uid,
                    timestamp: serverTimestamp(),
                })
            }
            router.push("/")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex justify-center mt-20 space-x-4'>
            <img
                src='https://icons-for-free.com/download-icon-mobile+twitter+twitter+logo+icon-1320190502194046250_512.png'
                alt='twitter-img'
                className='hidden object-cover md:inline-flex md:w-56 md:h-96 rotate-6'
            />
            <div className=''>

                <div className='flex flex-col items-center'>
                    <img
                        src='https://img.freepik.com/premium-vector/new-twitter-logo-x-2023-twitter-x-logo-vector-download_691560-10809.jpg?w=826'
                        alt='twitter-logo'
                        className='object-cover w-36'
                    />
                    <p className='my-10 text-sm italic text-center'>This app is created for learning purposes</p>
                    <button onClick={onGoogleClick} className="p-3 text-white bg-red-400 rounded-lg hover:bg-red-500">Sign in with Google</button>
                </div>

            </div>
        </div>
    )
}


export default Signin