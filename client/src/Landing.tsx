import React, { useState, useEffect  } from 'react'
import Axios from "axios";
import ProductContainer from "./modules/ProductContainer"
import Carousel from "./modules/Carousel"

const Landing = () => {
    let [data, setData] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:8000/api/getBanners").then((data) => {
          console.log(data.data);
          setData(data.data);
        });
      }, []);


    return(
        <div className='pt-24'>
            <Carousel bannerList={data}/> 
            <ProductContainer />
        </div>
    )
}

export default Landing;