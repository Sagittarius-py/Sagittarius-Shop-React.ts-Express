import { useState } from 'react'
import Axios from 'axios';

import { useCookies } from 'react-cookie';

const Profile = () => {
    const [cookies, setCookie, removeCookie] = useCookies([`email`]);
    const handleLogOut = async (e: any) => {
      e.preventDefault();
        const response = await fetch('http://localhost:8000/api/logout', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',

        });
        if (response.ok) {
          const win: Window = window;
          win.location = '/';
        }
    };


    return(
    <>
              <div className='bg-zinc-100 h-fit w-full p-4 select-none'>
                <h1>{cookies.email}</h1>
              </div>
            <button onClick={(e) => handleLogOut(e)} className="absolute bottom-4 left-4 bg-orange-500 px-4 py-2 rounded-sm hover:scale-110 duration-75">Log-out</button>

            </>  
    )
}

export default Profile;