import React, { useState, useEffect } from 'react';
import Axios from 'axios';


const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [newUserName, setNewUserName] = useState('');
  const [cities, setCities] = useState<any>();
  const [userInEdit, setUserInEdit] = useState('');
  const [userDataInEdit, setUserDataInEdit] = useState({email: "", postalCode: "", address: ""})

  const [userData, setUserData] = useState({email: "", postalCode: "", address: ""})

  useEffect(() => {
    Axios.get("http://localhost:8000/api/getAllUsers").then(data => setUsers(data.data))
    getCities();
  }, [])


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

  const handleDeleteUser = (userId: number) => {
    Axios.delete(`http://localhost:8000/api/deleteUser/${userId}`)
    const win: Window = window;
    win.location = '/admin';
  };

  const handleAddUser = async () => {
    const { email, address, postalCode } = userData;
    const response = await fetch('http://localhost:8000/api/register', { 
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',   
      body: JSON.stringify({ email, postalCode, address })
    });
    if (response.ok) {
      const win: Window = window;
      win.location = '/admin';
    }
  }
  
  const handleEditUser =  (user: any) => {
    setUserInEdit(user._id)
    return setUserDataInEdit({email: user.email,  postalCode: user.postalCode, address: user.address});
  }

  const handleSubmitEditedUser = async (userId: any) => {
    Axios.post(`http://localhost:8000/api/editUser/${userId}`, userDataInEdit)
    const win: Window = window;
    win.location = '/admin';
  }

  return (
    <div className="w-fit h-fit bg-slate-100 rounded-xl ml-2 p-2">
      <h1 className="text-3xl font-semibold mb-4">User Management</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter user name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>

      {users.length > 0 ? (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Postal Code</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} id={user._id}>
                {userInEdit ===  user._id ?
                <>
                <td className="border px-4 py-2">{user._id}</td>
                <td className="border px-4 py-2"><input type="text" defaultValue={user.email} onChange={(e) => {return setUserDataInEdit({...userDataInEdit, "email": e.target.value})}}/></td>
                <td className="border px-4 py-2">
                <select
                  onChange={(e) => setUserDataInEdit({...userDataInEdit, "postalCode": e.target.value})}
                  className="border w-full border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                >
                  {cities?.map((city:any) => {
                    return <>
                    <option key={city.id} value={city.kod_pocztowy}>{city.kod_pocztowy + " | " + city.nazwa}</option>
                    </>
                  })}
                </select>

                </td>
                <td className="border px-4 py-2"><input type="text" defaultValue={user.address}  onChange={(e) => {return setUserDataInEdit({...userDataInEdit, address: e.target.value})}}/></td>
                
                <td className="border px-4 py-2">
                  <button
                    className="text-red-500 hover:text-red-600 mr-2"
                    onClick={() =>setUserInEdit('')}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-blue-500 hover:yellow-blue-600 mr-2 w-fit"
                    onClick={() => handleSubmitEditedUser(user._id)}
                  >
                    Submit
                  </button>
                  
                </td>
                </>
                :
                <>
                <td className="border px-4 py-2">{user._id}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.postalCode}</td>
                <td className="border px-4 py-2">{user.address}</td>
                
                <td className="border px-4 py-2">
                  <button
                    className="text-red-500 hover:text-red-600 mr-2"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="text-yellow-500 hover:yellow-red-600 mr-2"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </button>
                  
                </td>
                </>
              }
                
              </tr>
            ))}
            </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserManagement;