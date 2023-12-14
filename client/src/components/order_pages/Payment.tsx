import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import CartProduct from "./CartProduct";
import countryList from "../Countries";
import Axios from "axios";


const Payment = () => {
    let {orderId} :any = useParams();
    console.log(orderId, "product id")
    const [cookies, setCookie, removeCookie] = useCookies([`userId`]);

    const [user_name, setUser_name] = useState("")
    const [user_surname, setUser_surname] = useState("")
    const [address, setAddress] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")


    const [order, setOrder] = useState<any>()

    useEffect(() => {
        Axios.get(`http://localhost:8000/api/getOrder/${orderId}`).then(data => {
            // if(data.userId == cookies.userId)
            setOrder(data.data)
        })
    }, [])


    
    return (
        <>{
            cookies.userId === order?.order_userId ?
            (
            <div className="w-full h-screen px-2 pt-20 pb-4 flex justify-center">
                <div className="w-2/3 h-full ml-2 bg-zinc-500/50 p-4 rounded-xl">
                    <form className="w-2/5 h-full bg-zinc-900 rounded-xl flex  flex-col items-center flex-nowrap justify-evenly">
                        <div className="flex w-4/5 -mt-10">
                            <input onChange={(e) => setUser_name(e.target.value)} className="text-2xl w-96 h-12 absolute border-orange-500 border-solid border-2 rounded-full bg-zinc-900 focus:border-blue-500  outline-none text-white pl-4 ease-linear duration-100" type="text" name="name" id="name" required />
                            <label className="text-zinc-400 absolute ml-6 -mt-5 bg-zinc-900 px-1 text-2xl">Name</label>
                        </div>

                        <div className="flex w-4/5">
                            <input onChange={(e) => setUser_surname(e.target.value)} className="text-2xl w-96 h-12 absolute border-orange-500 border-solid border-2 rounded-full bg-zinc-900 focus:border-blue-500  outline-none text-white pl-4 ease-linear duration-100" type="text" name="name" id="name" required />
                            <label className="text-zinc-400 absolute ml-6 -mt-5 bg-zinc-900 px-1 text-2xl">Surname</label>
                        </div>

                        <div className="flex w-4/5">
                            <input onChange={(e) => setAddress(e.target.value)} className="text-2xl w-96 h-12 absolute border-orange-500 border-solid border-2 rounded-full bg-zinc-900 focus:border-blue-500  outline-none text-white pl-4 ease-linear duration-100" type="text" name="name" id="name" required />
                            <label className="text-zinc-400 absolute ml-6 -mt-5 bg-zinc-900 px-1 text-2xl">Address</label>
                        </div>

                        <div className="flex w-4/5 justify-start">
                            <input onChange={(e) => setPostalCode(e.target.value)} className="text-xl w-48 absolute h-12 border-orange-500 border-solid border-2 rounded-full bg-zinc-900 focus:border-blue-500  outline-none text-white pl-4 ease-linear duration-100" type="text" name="name" id="name" required />
                            <label className="text-zinc-400 absolute ml-6 -mt-5 bg-zinc-900 px-1 text-2xl">Postal Code</label>
                        </div>

                        <div className="flex w-4/5">
                            <input onChange={(e) => setCity(e.target.value)} className="w-96 h-12 absolute border-orange-500 border-solid border-2 rounded-full bg-zinc-900 focus:border-blue-500  outline-none text-white pl-4 ease-linear duration-100" type="text" name="name" id="name" required />
                            <label className="text-zinc-400 absolute ml-6 -mt-5 bg-zinc-900 px-1 text-2xl">City</label>
                        </div>

                        <div className="flex w-4/5">
                            <select onChange={(e) => setCountry(e.target.value)} className="w-96 h-12 absolute border-orange-500 border-solid border-2 rounded-full bg-zinc-900 focus:border-blue-500  outline-none text-white pl-4 ease-linear duration-100" name="name" id="name" required >
                                <option className="text-2xl">{country}</option>
                                {countryList.map((country) => {
                                    return<option className="text-2xl">{country}</option>
                                })}
                            </select>
                            <label className="text-zinc-400 absolute ml-6 -mt-5 bg-zinc-900 px-1 text-2xl">Country</label>
                        </div>

                        <div className="flex w-4/5">
                            <input onChange={(e) => setPhoneNumber(e.target.value)} className="w-96 h-12 absolute border-orange-500 border-solid border-2 rounded-full bg-zinc-900 focus:border-blue-500  outline-none text-white pl-4 ease-linear duration-100" type="text" name="name" id="name" required />
                            <label className="text-zinc-400 absolute ml-6 -mt-5 bg-zinc-900 px-1 text-2xl">Phone Number</label>
                        </div>
                    </form>
                </div>
                <div className="w-1 h-full mx-4 bg-blue-500 rounded-full"></div>
                <div className="w-1/4 h-full mr-2 bg-zinc-700/50 p-4 rounded-xl">
                <h1 className="text-white text-8xl">{order.order_sumPrice} zł</h1>
                <div className="h-1 w-11/12 bg-orange-500/75 mb-12 rounded-full"></div>
                <h3 className="text-white text-2xl ml-3">{(order.order_sumPrice * 0.23).toFixed(2)} tax</h3>
                <div className="h-1 w-3/12 bg-orange-500/75 ml-2 mb-2 rounded-full"></div>

                </div>
    
            </div>
            ) 
            :
            (
            <></>
            )
        }
    
    </>)
}

export default Payment;