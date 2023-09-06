import { getProviders, signIn } from 'next-auth/react'

function signin({ providers }) {
  return (
    <div className='flex justify-center mt-20 space-x-4'>
        <img 
        src='https://icons-for-free.com/download-icon-mobile+twitter+twitter+logo+icon-1320190502194046250_512.png' 
        alt='twitter-img'
        className='hidden object-cover md:inline-flex md:w-56 md:h-96 rotate-6'
        />
        <div className=''>
            {Object.values(providers).map((provider) => (
                <div className='flex flex-col items-center'>
                    <img 
                    src='https://img.freepik.com/premium-vector/new-twitter-logo-x-2023-twitter-x-logo-vector-download_691560-10809.jpg?w=826' 
                    alt='twitter-logo'
                    className='object-cover w-36'
                    />
                    <p className='my-10 text-sm italic text-center'>This app is created for learning purposes</p>
                    <button onClick={()=>signIn(provider.id, {callbackUrl: "/"})} className="p-3 text-white bg-red-400 rounded-lg hover:bg-red-500">Sign in with{provider.name}</button>
                </div>
            ))}
        </div>
    </div>
  )
}

export async function getServerSideProps(){
    const providers = await getProviders();
    return {
        props:{
            providers,
        }
    }
}

export default signin