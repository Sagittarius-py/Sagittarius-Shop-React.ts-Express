import { useState } from 'react'


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ email, password })
        });
        if (response.ok) {
          const win: Window = window;
          win.location = '/';
        } else {
          console.log('Invalid username or password');
        }
    };


    return(
              <div className='bg-zinc-100 h-fit w-full p-4'>
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
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded"
                  onClick={(e) => handleSubmit(e)}
                >
                  Sign in
                </button>
              </div>
            </form>
              </div>
              
    )
}

export default Login;