import ProductCard from "./ProductCard"
import { useEffect, useState } from "react";
import Axios from "axios";

const ProductContainer = (props:any) => {

    const [data, setData] = useState([])


    useEffect(() => {
        Axios.get("http://localhost:8000/api/get").then((data) => {
          setData(data.data);
        });
      }, []);



    if(ProductCard){

    

    return(
        <div className="">
       
        <div className="flex mx-auto flex-wrap justify-around mt-10 min-h-[50vh] w-[90vw]">
            {data ? data.map((elem:any, key:number) => {return(<ProductCard key={key} product={elem}/>) }) : null}
        </div>
        </div>

    )}
    return null;
}

export default ProductContainer;