import Axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";


const CartProduct = (props: any) => {
    const productId = props.item[0];

    const [cookies, setCookie, removeCookie] = useCookies([`userId`]);
    const [productData, setProductData] = useState<any>()
    const [productAmount, setProductAmount] = useState<number>(props.item[1])


    useEffect(() => {
        if(!productData){
            Axios.get(`http://localhost:8000/api/getOneProduct/${productId}`).then(data => setProductData(data.data[0]))
        }
    }, [])
    

    const changeAmountHandle = (value: any) => {
        setProductAmount(value);
    }

    const deleteFromCart = async (productId: any) => {
        const userId = cookies.userId;
        const response = await fetch("http://localhost:8000/api/deleteFromBag", {
          method: "POST",
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
    <div className="w-4/5 h-20  rounded-xl flex overflow-hidden items-center my-2 px-2 bg-zinc-100">
        <div style={style} className="h-16 w-16 bg-cover bg-center rounded-full"></div>
        <div className="w-3/5 pl-6">
            <h1>{productData?.product_name}</h1>
            <input type="number" className="w-12" defaultValue={productAmount} min="1" max="" onChange={(e) => changeAmountHandle(e.target.value)}></input>
        </div>
        <div className="flex flex-col items-center w-16">
            <h1 className="text-xl">{productData?.product_price}zł</h1>
            <button className="bg-red-600 text-red w-fit px-1 rounded" onClick={() => deleteFromCart(productId)}>Del</button>
        </div>
    </div>
    )
}

export default CartProduct;