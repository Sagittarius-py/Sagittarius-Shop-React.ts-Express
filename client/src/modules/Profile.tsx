import { UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useCookies } from 'react-cookie';
import Axios from "axios";


const Profile = ({user}: any) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const [profileOpened, setProfileOpened] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        var data = {email, password}
        Axios.post(`http://localhost:8000/api/login`, data).then(response => {setCookie('user', response.data.user._id) }).catch(error => console.error(error))
    };

    const handleLogOut = () => {
      removeCookie('user')
      window.location.reload();
    }

    return(
        <>
        <div className="z-40 flex items-center justify-center  right-4 ">
            <div className='bg-slate-100 w-10 h-10 rounded-full z-50 flex items-center justify-center' onClick={() => setProfileOpened(!profileOpened)}>
               {profileOpened ?  <XMarkIcon className=" w-6" /> : <UserIcon className=" w-6" />   } 
            </div>
            <div className={`fixed bottom-0 right-0 z-40 h-screen bg-zinc-950 pt-16 ${profileOpened ? "w-96 p-4" :" w-0"} duration-200 shadow-xl shadow-orange-500/30`}>
              {!cookies.user ? 
              <div className='bg-zinc-100 h-fit w-full p-4'>
              <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 block">Email</label>
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 block">Password</label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded"
                >
                  Sign in
                </button>
              </div>
            </form>
              </div>
              : 
              <>
              <button onClick={handleLogOut} className="absolute bottom-4 left-4 bg-orange-500 px-4 py-2 rounded-sm hover:scale-110 duration-75">Log-out</button>
              </>
              }
                

            </div>
        </div>
        </>
    )
}

export default Profile;