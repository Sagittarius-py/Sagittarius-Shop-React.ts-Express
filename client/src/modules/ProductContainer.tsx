import ProductCard from "./ProductCard"
import { useEffect, useState } from "react";
import Axios from "axios";

const ProductContainer = (props:any) => {

    const [data, setData] = useState([])


    useEffect(() => {
        Axios.get("http://localhost:8000/api/get").then((data) => {
          console.log(data.data);
          setData(data.data);
        });
      }, []);

    var style = {"backgroundColor":"rgba(0,0,0,0)","backgroundImage":"linear-gradient(90deg, rgba(251, 146, 60, 0) 0%, #f97316 30%, #f97316 50%, #f97316 70%, rgba(251, 146, 60, 0) 100%)"}


    if(ProductCard){

    

    return(
        <div className="">
        <hr className="h-1 mx-auto my-4 bg-gray-100 border-0 rounded w-[calc(80vw-2rem)] md:my-10" style={style}/>
       
        <div className="flex mx-auto flex-wrap justify-around mt-10 min-h-[50vh] w-[90vw]">
            {data ? data.map((elem:any, key:number) => {return(<ProductCard key={key} product={elem}/>) }) : null}
        </div>
        </div>

    )}
    return null;
}

export default ProductContainer;