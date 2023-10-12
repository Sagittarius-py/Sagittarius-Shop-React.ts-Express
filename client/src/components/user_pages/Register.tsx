import { useState, useEffect } from 'react'


const Register = () => {
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [cities, setCities] = useState<any>();

    useEffect(() => {
        getCities();
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if(password1 === password2){
        const password = password1;
        const response = await fetch('http://localhost:8000/api/register', { 
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',   
          body: JSON.stringify({ email, password, address })
        });
        if (response.ok) {
          const win: Window = window;
          win.location = '/';
        }}
    };

    const getCities = async () => {
      const response = await fetch('http://localhost:8000/api/getCities', { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',   
      });

      if (response.ok) {
        const jsonResponse = await response.json()
        setCities(jsonResponse);
        console.log(cities)
      }
    }
    

    return(
        <div className='bg-zinc-100 h-fit w-full p-4 my-4'>
        <h3 className='justify-center w-full flex'>Register</h3>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 block">Email</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 block">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword1(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 block">Repeat Password</label>
          <input
            type="password"
            onChange={(e) => setPassword2(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 block">Address <span className='text-slate-500'>*line 1</span></label>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div className="mb-4 flex ">
          <div className='flex flex-col'>
            <label className="text-sm font-medium text-gray-700 block w-full">Postal Code</label>
            <select
              onChange={(e) => setPostalCode(e.target.value)}
              className="border w-full border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            >
              {cities?.map((city:any) => {
                return <>
                <option value={city.kod_pocztowy}>{city.kod_pocztowy + " | " + city.nazwa}</option>
                </>
              })}

            </select>
          </div>

          
        </div>

        <div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded"
            onClick={(e) => handleSubmit(e)}
          >
            Sign up
          </button>
        </div>
      </form>
        </div>
        
)


}

export default Register;