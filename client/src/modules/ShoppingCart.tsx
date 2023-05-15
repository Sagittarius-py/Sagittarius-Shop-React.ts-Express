import { ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {  useState } from 'react';

const ShoppingCart = () => {
    let [cartOpened, setCartOpened] = useState(false);

    return (
        <>
        <div className="z-40 flex items-center justify-center  right-4 ">
            <div className='bg-slate-100 w-10 h-10 rounded-full z-50 flex items-center justify-center' onClick={() => setCartOpened(!cartOpened)}>
               {cartOpened ?  <XMarkIcon className=" w-6" /> : <ShoppingBagIcon className=" w-6" />   } 
            </div>
            <div className={`fixed bottom-0 right-0 z-40 h-screen bg-zinc-950 ${cartOpened ? "w-96" :" w-0"} duration-200 shadow-xl shadow-orange-500/30`}></div>
  
        </div>
        </>
    )
}

export default ShoppingCart;