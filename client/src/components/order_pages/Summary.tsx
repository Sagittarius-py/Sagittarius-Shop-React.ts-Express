import { useState, useEffect } from 'react'
import Axios from 'axios';
import { useCookies } from 'react-cookie';
import CartProduct from "./CartProduct";
import { useHistory  } from "react-router-dom";


interface OrderSummary {
  userId: any,
  products: string[],
}

const Summary = () => {
  const history = useHistory ();
  const [cookies, setCookie, removeCookie] = useCookies([`userId`]);
  const [userData, setUserData] = useState<any>();
  let [sumPrice, setSumPrice] = useState<number>(0.00)

  let [orderSummary, setOrderSummary] = useState<OrderSummary>({
    "userId": "",
    "products": [],
  })


  useEffect(() => {
    getUserInfo();

  }, [])

  const getUserInfo = async () => {
    if(cookies.userId != null){
      const user = await Axios.get(`http://localhost:8000/api/getUser/${cookies.userId}`)

      if (user.status === 200) {
        setUserData(user.data);
      } else {
        console.error(user.status);
      }}
  }


  const proceedPayment = async () => {
      const dataToSend = {
        "userId": cookies.userId,
        "products": userData.shopping_bag,
      }


      await Axios.post(`http://localhost:8000/api/addOrder/`, dataToSend).then(data =>{
        
        history.push(`/payment/${data.data}`);
        window.location.reload();
      })
  }


  var increaseValue = async (value: number) => {
    setSumPrice(sumPrice += value)
  }
  



    return(
        <div className="bg-zinc-800 min-h-screen pt-24">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-semibold text-center mb-8 text-zinc-200">Order Summary</h1>
  
          <div className="bg-zinc-200 rounded shadow">
            <div className="px-6 py-4">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
  
              <div className="flex justify-between mb-4">
                <span className="font-medium">Date:</span>
                <span>{Date().toString().slice(3, 15)}</span>
              </div>
  
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total Amount:</span>
                <span>{(sumPrice).toFixed(2)} zł</span>
              </div>
            </div>
          </div>
  
          <div className="mt-8 static">
            <div className="relative flex flex-col lg:flex-row justify-between h-full">
              <div className="lg:w-2/3 w-full ml-4 h-full">

              </div>
            </div>
          </div>
  
          <div className="mt-8">
            <div className='w-full h-16 flex justify-center'>
                <button onClick={() => {
                  proceedPayment()
                }} className={`text-white hover:shadow-orange-500/30 bg-orange-500 hover:shadow-xl   hover:scale-125 hover:bg-orange-600 transition ease-in-out duration-300" p-4 rounded-xl  text-2xl`}>
                  Proceed and pay
                </button>
            </div>
            <h2 className="text-xl font-semibold mb-4 text-zinc-200" >Items</h2>
            {userData?.shopping_bag.map((item:any, key:any) =>{
              return <CartProduct item={item}  key={key} addToSum={increaseValue}/>
            })}

            
          </div>
        </div>
      </div>
    )
}

export default Summary