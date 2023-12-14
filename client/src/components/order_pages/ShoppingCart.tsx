import { ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {  useState, useEffect } from 'react';
import CartProduct from "./CartProduct";
import Axios from 'axios';
import { useCookies } from 'react-cookie';

const ShoppingCart = () => {
    const [cookies] = useCookies([`userId`]);
    let [cartOpened, setCartOpened] = useState(false);
    let [cartItems, setCartItems] = useState<any>()
    const [sumPrice, setSumPrice] = useState<number>(0.00)

    useEffect(() => {
        if(cookies.userId){
      Axios.get(`http://localhost:8000/api/getShoppingBag/${cookies.userId}`).then((data) => {setCartItems(data.data);})
      }
    }, [])

    
    

    return (
        <>
        <div className="z-40 flex items-center justify-center  right-4 ">
            <div className='bg-slate-100 w-10 h-10 rounded-full z-50 flex items-center justify-center' onClick={() => setCartOpened(!cartOpened)}>
               {cartOpened ?  <XMarkIcon className=" w-6" /> : <ShoppingBagIcon className=" w-6" />   } 
            </div>
            <div className={`px-4 fixed flex flex-col items-center bottom-0 right-0 z-40 h-screen bg-zinc-950 ${cartOpened ? "w-96" :" w-0 px-0 -mr-8"} duration-200 shadow-xl shadow-orange-500/30 pt-20`}>
                {cartOpened ? cartItems?.map((item:any, key:any) => { return <CartProduct item={item} addToSum={setSumPrice} sum={sumPrice} key={key}/>}) : null}
                
                <a className="absolute bottom-4 left-4 bg-orange-500 px-4 py-2 rounded-sm hover:scale-110 duration-75" href="/summary">Proceed</a>
            </div>

        </div>
        </>
    )
}

export default ShoppingCart;