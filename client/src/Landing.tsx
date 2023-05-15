import React, { useState, useEffect  } from 'react'

import ProductContainer from "./modules/ProductContainer"
import Carousel from "./modules/Carousel"

import bannerList from './bannerList'

const Landing = () => {
    return(
        <div className='pt-24'>
            <Carousel bannerList={bannerList}/> 
            <ProductContainer />
        </div>
    )
}

export default Landing;