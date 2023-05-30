import { UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useCookies } from 'react-cookie';

import Login from './Login'
import Profile from './Profile';
import Register from './Register';


const UserPanel = () => {
    const [cookies, setCookie, removeCookie] = useCookies([`userId`]);

    const [profileOpened, setProfileOpened] = useState(false);

    return(
        <>
        <div className="z-40 flex items-center justify-center  right-4 ">
            <div className='bg-slate-100 w-10 h-10 rounded-full z-50 flex items-center justify-center' onClick={() => setProfileOpened(!profileOpened)}>
               {profileOpened ?  <XMarkIcon className=" w-6" /> : <UserIcon className=" w-6" />   } 
            </div>
            <div className={`fixed bottom-0 right-0 z-40 h-screen bg-zinc-950 pt-16 ${profileOpened ? "w-96 p-4" :" w-0"} duration-200 shadow-xl shadow-orange-500/30`}>
              {!cookies.userId ? 
              <>
              <Login />
              <Register />
              </>
              : 
              <Profile />
              }
                

            </div>
        </div>
        </>
    )
}

export default UserPanel;