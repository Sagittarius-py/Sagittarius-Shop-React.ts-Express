import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import {  useState } from 'react';



const Carousel = (props: { bannerList: any; }) => {
  let bannerList = props.bannerList;
  console.log("banner list: ",  bannerList)

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
  
  return(
  <div className="relative z-10 flex items-center justify-center w-2/3 mx-auto shadow-2xl h-96">
    <ChevronLeftIcon onClick={() => {changeBannerHandle(-1)}} 
    className='absolute z-20 h-12 duration-300 ease-in-out bg-white rounded-full cursor-pointer left-3 hover:-translate-x-2 ' />
    {
      bannerList?.map((banner: any,key: number) => {
          var id = banner._id;
          console.log(id)
          var title = banner.banner_title 
          var desc = banner.banner_desc;
          if(desc){
            desc = desc.slice(0,50);
          }
        
        if(key == activeBanner){
        return(<div  key={key} className='relative w-full h-full z-10'>
                <img src={require(`../images/banner_images/${id}.jpg`)}  alt={id} className='relative z-10 object-cover w-full h-full overflow-hidden select-none relative'/>
                <div className='z-40 absolute bottom-0 h-1/3 w-full bg-gradient-to-r from-slate-500/30 p-4'>
                  <h1 className='text-white text-xl'>{title}</h1>
                  <hr className="h-1 mx-auto bg-gray-100 border-0 rounded w-1/4 dark:bg-orange-500/80 float-left"/>
                  <p className='pt-2 w-1/2 text-white'>{desc}...</p>
                </div>
              </div>
        )} else {
          return null;
        }
      })
    }
    <div className='absolute bottom-0 z-20 flex items-center justify-center w-48 h-8 mx-auto'>
      { bannerList?.map((dot: any,key: number) => {return(<div key={key} className={`w-4 h-4 mx-1 bg-white rounded-full ${activeBanner == key ? 'bg-opacity-100' : 'bg-opacity-50'}`}></div>)})}
      </div>
    <ChevronRightIcon onClick={() => {changeBannerHandle(1)}} 
    className='absolute z-20 h-12 duration-300 ease-in-out bg-white rounded-full cursor-pointer right-3 hover:translate-x-2'/>
  </div>);
};

export default Carousel;
