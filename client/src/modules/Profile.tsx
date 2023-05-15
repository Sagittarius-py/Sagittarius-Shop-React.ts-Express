import { UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useCookies } from 'react-cookie';



const Profile = ({user}: any) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    let [profileOpened, setProfileOpened] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const response = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

  if (response.ok) {
        setCookie('user', true, {
            path: '/',
          })  
  }
};

    return(
        <>
        <div className="z-40 flex items-center justify-center  right-4 ">
            <div className='bg-slate-100 w-10 h-10 rounded-full z-50 flex items-center justify-center' onClick={() => setProfileOpened(!profileOpened)}>
               {profileOpened ?  <XMarkIcon className=" w-6" /> : <UserIcon className=" w-6" />   } 
            </div>
            <div className={`fixed bottom-0 right-0 z-40 h-screen bg-zinc-950 pt-16 ${profileOpened ? "w-96 p-4" :" w-0"} duration-200 shadow-xl shadow-orange-500/30`}>
                <div className='bg-zinc-500 h-96 w-full'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                        Email: <input type="text" onChange={(e) => setEmail(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                        Password: <input type="password" onChange={(e) => setPassword(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <button type="submit">Sign in</button>
                    </div>
                    </form>
                </div>

            </div>
        </div>
        </>
    )
}

export default Profile;