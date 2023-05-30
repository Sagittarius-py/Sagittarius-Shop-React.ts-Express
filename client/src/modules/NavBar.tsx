import ShoppingCart from '../components/order_pages/ShoppingCart';
import Profile from '../components/user_pages/UserPanel';

import { useWindowSize } from '../WindowSizeProvider';

import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, HomeIcon, UserIcon, XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useCookies } from 'react-cookie';



const NavBar = () => {
    const sizes = useWindowSize()
    return(
    <>{sizes.width > 720 ? <NavBarDesktop />:<NavBarMobile />}</>
    )
}



const NavBarDesktop = () => { 



    const [cookies, setCookie, removeCookie] = useCookies([`userId`]);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    let navOffset:number = 75;

    useEffect(() => {
    window.addEventListener("scroll", () =>{
        if(window.pageYOffset >= navOffset){
            setIsScrolled(true)
        }
        if(window.pageYOffset < navOffset){
            setIsScrolled(false)
        }  
    })
    })

    return (
        <div id="navbar" className={`fixed z-50 w-full duration-500 ${isScrolled ? "bg-zinc-950 shadow-lg shadow-orange-500/30" : null}`}>
            <header className="w-[calc(100%-2rem)] h-16 rounded-full mx-4 flex items-center relative justify-between">
                <a href="/">
                    <h1 className="text-3xl ml-4 rounded-full text-zinc-50" >Sagittarius Treasure</h1>               
                </a>
                <div className={`flex items-center duration-100 justify-center h-10 px-2 -ml-24 bg-white ${!isScrolled ? "border-2" : null}  rounded-full border-neutral-300 w-1/6`}>
                    <MagnifyingGlassIcon className='w-8 h-8 text-zinc-900'/>
                    <input type='text' className='w-full h-full mx-2 focus:outline-none'></input>
                </div>
                <div className='float-right flex w-32 justify-around'>
                    <Profile/>
                    {cookies.userId ? <ShoppingCart/> : null}
                </div>  
            </header>
                <div className={`absolute h-1 duration-100 w-[calc(100%-2rem)] bottom-0 flex flex-nowrap mx-4 ${isScrolled ? "opacity-0" : null}`}>
                    <div className="w-1/2 h-1 rounded-l-full bg-gradient-to-l from-orange-700 to-orange-400" ></div>
                    <div className="w-1/2 h-1 rounded-r-full bg-gradient-to-r from-orange-700 to-orange-400"></div>
                </div>
        </div>
    )
}


const NavBarMobile = () => { 
    const [cookies] = useCookies([`userId`]);
  

    return (
        <div id="navbar" className={`fixed z-50 w-full duration-500 bottom-0 bg-zinc-700 shadow-lg `}>
            <header className="w-[calc(100%-2rem)] h-16 rounded-full mx-4 flex items-center relative justify-between">
                
                <div className='float-right flex w-full justify-around'>
                    <MagnifyingGlassIcon className='w-10 h-10 text-black bg-orange-500 rounded-full p-2'/>
                    
                    <a href="/">
                        <HomeIcon className='w-10 h-10 text-black bg-orange-500 rounded-full p-2'/>         
                    </a>
                    <UserIcon className='w-10 h-10 text-black bg-orange-500 rounded-full p-2'/>
                    {cookies.userId ? <ShoppingBagIcon/> : null}
                </div>
            </header>
        </div>
        
    )
}

export default NavBar;