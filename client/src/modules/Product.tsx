  import { useEffect, useState } from 'react'
  import Axios from "axios";
  import { useParams } from "react-router-dom";


import RewiewBox from './RewiewBox'
import { HorizontalSeparator } from './SeparatorWithText'

  export default function Product() {
    let  { productID }:any = useParams();
    console.log(productID)
    const [product, setProduct] = useState<any>({})
    console.log(product)

   

    useEffect(() => {
      Axios.get(`http://localhost:8000/api/getOneProduct/${productID}`).then((data) => {
        console.log(data.data);
        setProduct(data.data[0]);
      });
    }, []);


    const convertPrice = (price:any) => {
      const priceSplitted = price?.toString().split(".");
      if(priceSplitted?.length > 1){
      if(priceSplitted[1]?.length < 2){
          price+="0"
      }}
      return price;
    }

    const randomData = (min: number, max:number) => {
      return Math.floor(Math.random() * (max - min) + min)
    }
  
    
    if(product)
    {
      return (
      <div className='pt-24 pb-16'>
                <div id="content" className='mx-8 min-h-fit bg-zinc-800 h-5/6 p-2 flex '>
                  <div id="left" className='lg:w-1/2 lg:h-full p-2'>
                    <div className='flex flex-wrap'>
                      <div className='w-2/3'>
                        <h1 className='text-white text-6xl mb-4'>{product.product_name}</h1>
                        <span className='text-white bg-zinc-500/50 ml-4 px-3 py-1  opacity-80'>{product.product_category}</span>
                        <p className='mt-2 ml-2 w-4/5 text-zinc-100/80 text-lg'>{product.product_description}</p>
                      </div>
                      <div className='w-1/4'>
                        <h1 className='text-white text-6xl float-right'>{convertPrice(product.product_price)}zł</h1>
                        <HorizontalSeparator className="bg-blue-500"/>
                        <button className='text-blue-500 p-2 rounded-lg hover:bg-blue-500 hover:text-white float-right border-2 border-blue-500 duration-100'>Add to bag</button>
                      </div>
                    </div>
                    <HorizontalSeparator className="bg-orange-500" text="Features"/>
                    <div className='flex'>
                      <div id="left" className='h-full w-1/2 ml-16'>
                        <p className='text-white'>Brand: Sagittarius</p>
                        <p className='text-white/90'>In stock: {product.product_stock}</p>
                        <p className='text-white/90'>Radius: {randomData(18, 24)}</p>
                        <p className='text-white/90'>Width: {randomData(4, 8)}</p>
                        <p className='text-white/90'>Thicness: {randomData(1, 3)}</p>
                      </div>
                      <div id="right" className='h-full w-1/2 mr-16'>
                        <p className='text-white'>Material: Tungsten</p>
                        <p className='text-white/90'>Model nr: {randomData(1, 10000) + "-" + randomData(1, 10000)}</p>
                      </div>
                    </div>
                    
                    <HorizontalSeparator className="bg-orange-500" text=""/>
                    Cokolwiek
                    <HorizontalSeparator className="bg-orange-500" text="Rewiews"/>
                    {
                       product.product_rewiews?.map((rewiew: any, key:any) => {
                        console.log("cokolwiek")
                        return (<RewiewBox key={key} rewiew={rewiew.product_rewiew} rating={rewiew.product_rating}/>)
                       }
                      )
                    } 
                  </div>
                  <div id="right" className='relative sm:h-[50vh] sm:w-[100vw]sm:w lg:w-1/2 lg:h-[80vh] bg-cover bg-center' style={{backgroundImage: `url(${require(`../images/product_images/${productID}_0.jpg`)})`}} />                     </div>
      </div>
      )
    } else {return null;}
  }