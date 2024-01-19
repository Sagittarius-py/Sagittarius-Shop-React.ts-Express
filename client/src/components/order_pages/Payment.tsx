import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import CartProduct from "./CartProduct";
import countryList from "../Countries";
import Axios from "axios";


const Payment = () => {
    let {orderId} :any = useParams();
    const [order, setOrder] = useState<any>()

    const [cookies, setCookie, removeCookie] = useCookies([`userId`]);

    
    const [user_name, setUser_name] = useState("")
    const [user_surname, setUser_surname] = useState("")
    const [address, setAddress] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    var [sumPrice, setSumPrice] = useState(0);

    const shipmentMetods = [
        {
            "id": "1",
            "name": "UPS",
            "logo": "https://www.globkurier.pl/wp-content/uploads/2018/11/ups1.png",
            "about": "cokolwiek",
            "price": 5.99
        },
        {
            "id": "2",
            "name": "Fedex",
            "logo": "https://cdn.worldvectorlogo.com/logos/fedex-express-6.svg",
            "about": "cokolwiek",
            "price": 5.99
        },
        {
            "id": "3",
            "name": "DPD",
            "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/DPD_logo_%282015%29.svg/1280px-DPD_logo_%282015%29.svg.png",
            "about": "cokolwiek",
            "price": 8.99
        },
        {
            "id": "4",
            "name": "DHL",
            "logo": "https://assets.dpdhl-brands.com/guides/dhl/guides-de/design-basics/logo-and-claim/responsive-logo/dhl_logo-claim_responsive_logo_versions_01.png",
            "about": "cokolwiek",
            "price": 12.99
        }
    ]


    const paymentMethods = [
        {
            "name": "BLIK",
            "logo": "https://seeklogo.com/images/B/blik-logo-A759DC4120-seeklogo.com.png",
        },
        {
            "name": "PayPal",
            "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png",
        },
        {
            "name": "Card",
            "logo": "https://i.pinimg.com/originals/9d/f3/24/9df3241359a8beee81be24b37ca06800.png",
        },
        {
            "name": "Transfer",
            "logo": "https://www.toneryzagrosze.pl/img/cms/logo_przelewy.gif",
        },
    ]




    const [selectedShipment, setSelectedShipment] = useState<any>({
        "id": "",
        "name": "",
        "logo": "",
        "about": "",
        "price": 0
    });
    const [selectedPayment, setSelectedPayment] = useState("");

    useEffect(() => {
        Axios.get(`http://localhost:8000/api/getOrder/${orderId}`).then(data => {
            // if(data.userId == cookies.userId)
            setOrder(data.data);
            setSelectedShipment(data.data.order_shipment);
        })
    }, [])

    var increaseValue = async (value: number) => {
        setSumPrice(sumPrice += value)
      }
      

      const proceedPayment = async () => {

        const data = {
            "shippingName": user_name,
            "shippingSurname": user_surname,
            "address": address,
            "postalCode": postalCode,
            "city": city,
            "country": country,
            "phoneNumber": phoneNumber,
            "sumProce": sumPrice,
            "shipmentId": selectedShipment.id,
        }


            await Axios.post(`http://localhost:8000/api/updateOrder/${orderId}`, data).then((wynik:any) => {
                setOrder(wynik)
            })
        


        
      }
    
    return (
        <div className="flex h-screen w-full justify-center items-center">{
            cookies.userId === order?.order_userId ?
            (
            <div className="w-4/5 lg:h-4/5 px-2 pt-20 pb-4 flex justify-center flex sm:flex-col sm:h-max lg:flex-row">
                <div className="w-2/3 h-full ml-2 bg-zinc-800 p-4 rounded-xl flex sm:flex-col lg:flex-row">
                    <fieldset className="w-2/5 h-full bg-zinc-900 rounded-xl flex  flex-col items-center flex-nowrap justify-evenly relative">
                        <legend className="text-orange-500 px-2 ml-4 text-xl">Shipping info</legend>
                        <fieldset className="flex w-4/5 -mt-10">
                                <legend className="text-zinc-400 absolute ml-6 -mt-5 bg-zinc-900 px-1 text-2xl z-10">Name</legend>
                                {
                                order.order_finished ? 
                                <input disabled value={order.order_shippingName} onChange={(e) => setUser_name(e.target.value)} className="text-2xl w-4/5 h-12 absolute border-orange-500 border-solid border-2 rounded-full bg-zinc-900 focus:border-blue-500  outline-none text-white pl-4 ease-linear duration-100" type="text" name="fname" id="fname" required />
                                :
                                <input onChange={(e) => setUser_name(e.target.value)} className="text-2xl w-4/5 h-12 absolute border-orange-500 border-solid border-2 rounded-full bg-zinc-900 focus:border-blue-500  outline-none text-white pl-4 ease-linear duration-100" type="text" name="fname" id="fname" required />
                                }
                        </fieldset>

                        <fieldset className="flex w-4/5">
                                <legend className="text-zinc-400 absolute ml-6 -mt-5 bg-zinc-900 px-1 text-2xl z-10">Surname</legend>
                                {
                                order.order_finished ? 
                                <input disabled value={order.order_shippingSurname} onChange={(e) => setUser_surname(e.target.value)} className="text-2xl w-4/5 h-12 absolute border-orange-500 border-solid border-2 rounded-full bg-zinc-900 focus:border-blue-500  outline-none text-white pl-4 ease-linear duration-100" type="text" name="lname" id="lname" required />
                                :
                                <input onChange={(e) => setUser_name(e.target.value)} className="text-2xl w-4/5 h-12 absolute border-orange-500 border-solid border-2 rounded-full bg-zinc-900 focus:border-blue-500  outline-none text-white pl-4 ease-linear duration-100" type="text" name="fname" id="fname" required />
                                }
                        </fieldset>

                        <fieldset className="flex w-4/5">
                        <legend className="text-zinc-400 absolute ml-6 -mt-5 bg-zinc-900 px-1 text-2xl z-10">Address</legend>
                                {
                                order.order_finished ? 
                                <input disabled value={order.order_Address} onChange={(e) => setAddress(e.target.value)} className="text-2xl w-4/5 h-12 absolute border-orange-500 border-solid border-2 rounded-full bg-zinc-900 focus:border-blue-500  outline-none text-white pl-4 ease-linear duration-100" type="text" name="address" id="address" required />
                                :
                                <input onChange={(e) => setAddress(e.target.value)} className="text-2xl w-4/5 h-12 absolute border-orange-500 border-solid border-2 rounded-full bg-zinc-900 focus:border-blue-500  outline-none text-white pl-4 ease-linear duration-100" type="text" name="address" id="address" required />
                                }
                        </fieldset>

                        <div className="flex w-4/5">
                            <fieldset className="flex w-4/5 justify-start">
                            <legend className="text-zinc-400 absolute ml-3 -mt-5 bg-zinc-900 px-1 text-xl z-10">Postal Code</legend>
                                {
                                order.order_finished ? 
                                <input disabled value={order.order_PostalCode} onChange={(e) => setPostalCode(e.target.value)} className="text-xl w-2/6 absolute h-12 border-orange-500 border-solid border-2 rounded-full bg-zinc-900 focus:border-blue-500  outline-none text-white pl-4 ease-linear duration-100" type="text" name="postalCode" id="postalCode" required />
                                :
                                <input onChange={(e) => setPostalCode(e.target.value)} className="text-xl w-2/6 absolute h-12 border-orange-500 border-solid border-2 rounded-full bg-zinc-900 focus:border-blue-500  outline-none text-white pl-4 ease-linear duration-100" type="text" name="postalCode" id="postalCode" required />
                                }
                            </fieldset>

                            <fieldset className="flex w-4/5">
                            <legend className="text-zinc-400 absolute ml-3 -mt-5 bg-zinc-900 px-1 text-xl z-10">City</legend>
                                {
                                order.order_finished ? 
                                <input disabled value={order.order_City} onChange={(e) => setCity(e.target.value)} className="text-xl  w-2/5 h-12 absolute border-orange-500 border-solid border-2 rounded-full bg-zinc-900 focus:border-blue-500  outline-none text-white pl-4 ease-linear duration-100" type="text" name="city" id="city" required />
                                :
                                <input onChange={(e) => setCity(e.target.value)} className="text-xl  w-2/5 h-12 absolute border-orange-500 border-solid border-2 rounded-full bg-zinc-900 focus:border-blue-500  outline-none text-white pl-4 ease-linear duration-100" type="text" name="city" id="city" required />
                                }
                            </fieldset>
                        </div>

                        <fieldset className="flex w-4/5">
                        <legend className="text-zinc-400 absolute ml-6 -mt-5 bg-zinc-900 px-1 text-2xl z-10">Country</legend>
                                {
                                order.order_finished ? 
                                    <input disabled value={order.order_Country} onChange={(e) => setCity(e.target.value)} className="text-xl  w-4/5 h-12 absolute border-orange-500 border-solid border-2 rounded-full bg-zinc-900 focus:border-blue-500  outline-none text-white pl-4 ease-linear duration-100" type="text" name="country" id="country" required />
                                :
                                
                                    <select value={order.order_Country} onChange={(e) => setCountry(e.target.value)} className="text-xl w-4/5 h-12 absolute border-orange-500 border-solid border-2 rounded-full bg-zinc-900 focus:border-blue-500  outline-none text-white pl-4 ease-linear duration-100" name="country" id="country" required >
                                        <option className="text-2xl">{country}</option>
                                        {countryList.map((country) => {
                                            return<option className="text-2xl" key={country}>{country}</option>
                                        })}
                                    </select>                                
                                }

                        </fieldset>

                        <fieldset className="flex w-4/5">
                        <legend className="text-zinc-400 absolute ml-6 -mt-5 px-1 text-2xl bg-zinc-900 z-10">Phone Number</legend>
                                {
                                order.order_finished ? 
                                <input disabled value={order.order_PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="text-xl w-4/5 h-12 absolute border-orange-500 border-solid border-2 rounded-full bg-zinc-900 focus:border-blue-500  outline-none text-white pl-4 ease-linear duration-100" type="text" name="phone" id="phone" required />
                                :
                                <input onChange={(e) => setPhoneNumber(e.target.value)} className="text-xl w-4/5 h-12 absolute border-orange-500 border-solid border-2 rounded-full bg-zinc-900 focus:border-blue-500  outline-none text-white pl-4 ease-linear duration-100" type="text" name="phone" id="phone" required />
                                }
                        </fieldset>
                    </fieldset>

                    <div className="w-3/5 ml-4 flex flex-col justify-between">
                        <fieldset className="w-full  rounded-2xl mb-4 flex flex-col justify-between py-2 px-4 border-solid border-4 border-zinc-900 max-h-fit">
                                <legend className="text-orange-500 px-2 ml-4 text-lg">Delivery</legend>
                                {
                                    shipmentMetods.map((method) =>{
                                        return (
                                        <div key={method.id} id={method.name} onClick={(e) => {setSelectedShipment(method.id)}} className={`relative cursor-pointer flex flex-row w-full my-2 h-16 hover:bg-zinc-700/75 rounded-xl p-4 items-center ${selectedShipment === method.id ? "bg-zinc-600" : " bg-zinc-900"}`}>
                                            <div className="w-2/6">
                                                <img alt={method.name} src={method.logo} className=" h-10 mr-4"></img>
                                            </div>
                                            <div>
                                                <h1 className="text-white text-2xl">{method.name}</h1>
                                            </div>
                                            <div className="text-xl h-6 absolute right-6">
                                                <p className="text-white">{method.price}zł</p>
                                            </div>
                                        </div>)
                                    })
                                }

                        </fieldset>
                        <fieldset className="w-full h-full border-solid border-4 border-zinc-900 rounded-xl flex justify-center items-center relative">
                            <legend className="text-orange-500 px-2 ml-4 text-lg">Payment</legend>
                                <div className="w-full flex flex-wrap  justify-between">
                                {
                                    paymentMethods.map((method) =>{
                                        return (
                                        <div key={method.name} onClick={() => setSelectedPayment(method.name)} className={`flex flex-col items-center justify-center bg-white rounded-md shadow-md p-1 h-au w-2/5 p-3 w-1/3 h-1/3 m-2 cursor-pointer ${selectedPayment == method.name ? "bg-zinc-600" : "bg-zinc-900"}`}>
                                            <img src={method.logo} alt="BLIK" className=" h-12" />
                                        </div>)
                                    })
                                }
                                </div>
                        </fieldset>
                    </div>
                </div>
                <div className="w-1 h-full mx-4 bg-blue-500 rounded-full"></div>
                <div className="w-1/4 h-full mr-2 bg-zinc-700/50 p-4 rounded-xl relative">
                    <h1 className="text-white text-6xl">{(sumPrice).toFixed(2)} zł</h1>
                    <div className="h-1 w-11/12 bg-orange-500/75 mb-12 rounded-full"></div>
                    <h3 className="text-white text-2xl ml-3">{(sumPrice * 0.23).toFixed(2)} tax</h3>
                    <div className="h-1 w-3/12 bg-orange-500/75 ml-2 mb-2 rounded-full"></div>

                    <div className="overflow-auto h-96 mt-4 pr-4">
                    {order.order_products?.map((product:any, key:any) => {
                        return(
                            <CartProduct item={product}  key={key} addToSum={increaseValue} hideDel/>
                        )
                    })}
                    
                    </div>
                    <button onClick={() => {if(order.order_finished) {} else {proceedPayment()}}} className={`absolute bottom-6 right-8 text-white hover:shadow-orange-500/30 bg-orange-500  px-4 py-2 rounded-xl  text-2xl ${order.order_finished ? "opacity-40 cursor-default" : "hover:shadow-xl   hover:scale-125 hover:bg-orange-600 transition ease-in-out duration-300"}`}>Proceed</button>
                                
                </div>
            </div>
            ) 
            :
            (
            <></>
            )
        }
    
    </div>)
}

export default Payment;