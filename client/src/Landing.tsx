import React, { useState, useEffect  } from 'react'
import Axios from "axios";
import ProductContainer from "./components/product_pages/ProductContainer"
import Carousel from "./modules/Carousel"
import { useWindowSize } from './WindowSizeProvider';

const Landing = () => {
    let [data, setData] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:8000/api/getBanners").then((data) => {
          setData(data.data);
        });
      }, []);


    return(
        <div className={`${useWindowSize().width > 640 ? " pt-24" : "pt-6"} `}>
            <Carousel bannerList={data}/> 
            <ProductContainer />
        </div>
    )
}

export default Landing;