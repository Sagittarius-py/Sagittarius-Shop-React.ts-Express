import { useState, useEffect } from 'react'
import Axios from 'axios';
import { useCookies } from 'react-cookie';
import CartProduct from "./CartProduct";

interface ShippingOption {
  id: number;
  name: string;
  price: number;
}

interface OrderSummary {
  userId: any,
  products: string[],
  address: string,
  postalCode: string,
  shippingPrice: number,
  sumPrice: number
}

const Summary = () => {
  const [cookies, setCookie, removeCookie] = useCookies([`userId`]);
  const [selectedOption, setSelectedOption] = useState<ShippingOption>({
    "id": 0,
    "name": "x",
    "price": 0,
  });
  const [userData, setUserData] = useState<any>();
  const [cityData, setCityData] = useState<any>();
  let [sumPrice, setSumPrice] = useState<number>(0.00)

  let [orderSummary, setOrderSummary] = useState<OrderSummary>({
    "userId": "",
    "products": [],
    "address": "",
    "postalCode": "",
    "shippingPrice": 0,
    "sumPrice": 0,
  })

  const shippingOptions: ShippingOption[] = [
    { id: 1, name: 'Standard Shipping', price: 9.99 },
    { id: 2, name: 'Express Shipping', price: 19.99 },
    { id: 3, name: 'Priority Shipping', price: 29.99 },
    
  ];

  useEffect(() => {
    getUserInfo();
  }, [])

  const getUserInfo = async () => {
    if(cookies.userId != null){
      const user = await Axios.get(`http://localhost:8000/api/getUser/${cookies.userId}`)
      const city = await Axios.get(`http://localhost:8000/api/getOneCity/${user.data.postalCode}`)

      if (user.status === 200) {
        setUserData(user.data);
        setCityData(city.data)
      } else {
        console.error(user.status);
      }}
  }

  const changeSumarry = () => {
    orderSummary = {
      "userId": userData._id,
      "products": userData.shopping_bag,
      "address": userData.address,
      "postalCode": userData.postalCode,
      "shippingPrice": selectedOption.price,
      "sumPrice": sumPrice
  }
  console.log(orderSummary)

  }

  const proceedPayment = async () => {
    changeSumarry()
    if(selectedOption.price !== 0){
      await Axios.post(`http://localhost:8000/api/addOrder/`, orderSummary)
    }
    console.log(orderSummary)
  }



  const handleOptionSelect = (option: ShippingOption) => {
    setSelectedOption(option);
  };

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
                <span>{(sumPrice + selectedOption?.price).toFixed(2)} zł</span>
              </div>
            </div>
          </div>
  
          <div className="mt-8 static">
            <div className="relative flex flex-col lg:flex-row justify-between h-full">
              <div className="bg-zinc-200 rounded shadow px-6 py-4 w-full mb-2 lg:w-1/3 mr-4">
              <h2 className="text-2xl font-semibold mb-4 ">Shipping Address</h2>
                <p>{userData?.address}</p>
                <p>{cityData?.nazwa + " " + cityData?.kod_pocztowy}</p>
              </div>
              <div className="lg:w-2/3 w-full ml-4 h-full">
                <>
                <div className="container mx-auto p-4 bg-zinc-200 rounded">
                  <h1 className="text-2xl font-semibold mb-4">Shipping Options</h1>

                  <div className="flex flex-col gap-4  p-4">
                    {shippingOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`flex items-center justify-between border rounded px-4 py-2 ${
                          selectedOption?.id === option.id
                            ? 'bg-blue-200'
                            : 'bg-white hover:bg-gray-100'
                        }`}
                        onClick={() =>{ handleOptionSelect(option);}}
                      >
                        <span>{option.name}</span>
                        <span>${option.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                </>
              </div>
            </div>
          </div>
  
          <div className="mt-8">
            <div className='w-full h-16 flex justify-center'>
                <button onClick={() => {
                  proceedPayment()
                }} className={`${selectedOption.id === 0 ? "bg-orange-500/50 text-white/50" : "text-white hover:shadow-orange-500/30 bg-orange-500 hover:shadow-xl   hover:scale-125 hover:bg-orange-600 transition ease-in-out duration-300"} p-4 rounded-xl  text-2xl`}>
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