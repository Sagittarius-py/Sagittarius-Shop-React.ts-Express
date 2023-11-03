import Axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";


const CartProduct = (props: any) => {
    const productId = props.item;

    const [cookies, setCookie, removeCookie] = useCookies([`userId`]);
    const [productData, setProductData] = useState<any>()
    const [updated, setUpdated] = useState<boolean>(false)

    useEffect(() => {
        if(!productData){
            Axios.get(`http://localhost:8000/api/getOneProduct/${productId}`).then(
            data => {
                setProductData(data.data[0]); 
            })
        } else {
            if(!updated){
             props.addToSum(productData.product_price)
             setUpdated(true)
            }
        }

    }, [productData, productId, props])
    
    const deleteFromCart = async (productId: any) => {
        const userId = cookies.userId;
        const response = await fetch("http://localhost:8000/api/deleteFromBag", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ userId, productId }),
        });
        console.log(response)
        if (response.ok) {
            const win: Window = window;
            win.location.reload();
        }
      };


    let style = { backgroundImage: `url(http://localhost:8000/${productId}_0.jpg)` }
    return(
    <div className="w-full h-20  rounded-xl flex overflow-hidden items-center justify-between my-2 px-2 bg-zinc-100">
        
        <div style={style} className="h-16 w-16 bg-cover bg-center rounded-full"></div>
        <div className="w-4/5 pl-6">
            <h1 className="text-black">{productData?.product_name}</h1>
            
        </div>
        
        <div className="flex flex-col items-center w-16">
            <h1 className="text-xl">{productData?.product_price.toFixed(2)}zł</h1>
            <button className="bg-red-600 text-red w-fit px-1 rounded" onClick={() => deleteFromCart(productId)}>Del</button>
        </div>
    </div>
    )
}

export default CartProduct;