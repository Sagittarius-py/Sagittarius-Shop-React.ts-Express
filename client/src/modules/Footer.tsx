import { WindowSizeProvider, useWindowSize } from '../WindowSizeProvider';
import { useCookies } from 'react-cookie';


const Footer = () => {
    const [cookies, setCookie, removeCookie] = useCookies([`admin`]);

    if(useWindowSize().width > 640){
    return(
        <>
        <div className="w-full h-24 bg-zinc-950 border-t-2 border-orange-500/60 flex flex-col justify-center items-center">
            <p className="text-zinc-200/70 text-lg">&#169; Filip Sieniawski</p><br/>
            {cookies.admin ?  <a href="/admin" className="text-white">Admin</a> : null}
           
        </div>
        </>
    )} else {
        return (
            <div className='w-full h-16'></div>
        )
    }
}

export default Footer;