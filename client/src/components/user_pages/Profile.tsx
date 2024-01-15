import { useState, useEffect } from 'react'
import Axios from 'axios';


import { useCookies } from 'react-cookie';

const Profile = () => {
    const [cookies, setCookie, removeCookie] = useCookies([`userId`,`email`]);
    const [orders, setOrders] = useState<any>([])

    useEffect(() => {

      Axios.get(`http://localhost:8000/api/getUserOrders/${cookies.userId}`).then(data => {setOrders(data.data)})

    }, [])
    


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
        <div className='bg-zinc-100 w-full p-4 select-none'>
                <h1 className='text-xl'>{cookies.email}</h1>
              </div>
            <h2 className='text-white mt-4 text-2xl'>Your orders</h2>
            <div className='w-full h-4/5 mb-12 overflow-auto' >
            {
              orders?.map((order:any) => {

                return(
                  <a href={`/payment/${order._id}`}  key={order._id}>
                    <div className={`w-full mt-2 h-24 ${order.order_finished ? "bg-blue-400" : "bg-orange-400"}  p-2 flex justify-center items-center flex-col`}>
                      <h1 className="text-2xl">{order.order_products.length} PROUCTS</h1>
                      <h2 className="">{order.order_date}</h2>
                    </div>
                  </a>
                )
              })
            }
            </div>


            <button onClick={(e) => handleLogOut(e)} className="absolute bottom-4 left-4 bg-orange-500 px-4 py-2 rounded-sm hover:scale-110 duration-75">Log-out</button>

            </>  
    )
}

export default Profile;