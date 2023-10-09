import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import {  useState } from 'react';
import { useWindowSize } from '../WindowSizeProvider';



const Carousel = (props: { bannerList: any; }) => {
  let bannerList = props.bannerList;
  let [activeBanner, setActiveBanner] = useState(0);



  const changeBannerHandle = (num: number) => {
    if(activeBanner + num >= 0 && activeBanner + num < bannerList.length ){
      setActiveBanner(activeBanner+num);
    }
    if(activeBanner + num < 0){
      setActiveBanner( bannerList.length -1);
    }
    if(activeBanner + num > bannerList.length -1){
      setActiveBanner( 0);
    }
  }

  const width = useWindowSize().width;


  
  return(
  <div className={`relative z-10 flex items-center justify-center sm:w-2/3 w-full h-[calc(100vh-4rem)] sm:mt-0 -mt-6 mx-auto shadow-2xl sm:h-96`}>
    <div className='w-screen h-16 absolute sm:hidden z-20 top-0 flex justify-center items-center'>
      <h1 className='text-blue-500 text-4xl font-sans'>Sagitt Treasure</h1>
    </div>

    <ChevronLeftIcon onClick={() => {changeBannerHandle(-1)}} 
    className={`absolute z-20 h-10 sm:h-12 duration-300 ease-in-out text-orange-500 sm:text-black  bg-white/80 sm:bg-white rounded-full cursor-pointer left-3 hover:-translate-x-2 `} />
    {
      bannerList?.map((banner: any,key: number) => {
          var id = banner._id;
          var title = banner.banner_title 
          var desc = banner.banner_desc;
          if(desc){
            desc = desc.slice(0,50);
          }
        
        if(key === activeBanner){
        return(<div  key={key} className='relative w-full h-full z-10'>
                <img src={require(`../images/banner_images/${id}.jpg`)}  alt={id} className='relative z-10 object-cover w-full h-full overflow-hidden select-none relative'/>
                <div className={`z-40 absolute bottom-0 sm:h-1/3 h-1/6 w-full bg-gradient-to-r from-zinc-700/50 p-4`}>
                  <h1 className='text-white text-xl'>{title}</h1>
                  <hr className="h-1 mx-auto bg-gray-100 border-0 rounded w-1/4 dark:bg-orange-500 float-left"/>
                  <p className='pt-2 w-1/2 text-white hidden sm:block'>{desc}...</p>
                  <a href="/" className='text-white bg-blue-500 px-2 py-1 absolute bottom-3 left-4 rounded-full'>Check</a>
                </div>
              </div>
        )} else {
          return null;
        }
      })
    }
    <div className='absolute bottom-0 z-20 flex items-center justify-center w-48 h-8 mx-auto'>
      { bannerList?.map((dot: any,key: number) => {return(<div key={key} className={`w-4 h-4 mx-1 bg-white rounded-full ${activeBanner === key ? 'bg-opacity-100' : 'bg-opacity-50'}`}></div>)})}
      </div>
    <ChevronRightIcon onClick={() => {changeBannerHandle(1)}} 
    className='absolute z-20 h-10 sm:h-12 duration-300 ease-in-out text-orange-500 bg-white/80 sm:bg-white sm:text-black rounded-full cursor-pointer right-3 hover:translate-x-2'/>
  </div>);
};

export default Carousel;
