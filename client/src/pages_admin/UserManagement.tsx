import React, { useState, useEffect } from 'react';
import Axios from 'axios';


const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [newUserName, setNewUserName] = useState('');

  const [userInEdit, setUserInEdit] = useState('');
  const [userDataInEdit, setUserDataInEdit] = useState({email: "", password: "", address: ""})

  const [userData, setUserData] = useState({email: "", password: "", address: ""})

  useEffect(() => {
    Axios.get("http://localhost:8000/api/getAllUsers").then(data => setUsers(data.data))

  }, [])

  const handleDeleteUser = (userId: number) => {
    Axios.delete(`http://localhost:8000/api/deleteUser/${userId}`).then((res)=> console.log(res))
    const win: Window = window;
    win.location = '/admin';
  };

  const handleAddUser = async () => {
    const { email, password, address } = userData;
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
      win.location = '/admin';
    } else {
      console.log('User alredy exists');
    }
  }
  
  const handleEditUser =  (user: any) => {
    setUserInEdit(user._id)
    return setUserDataInEdit({email: user.email,  password: user.password, address: user.address});
  }

  const handleSubmitEditedUser = async (userId: any) => {
    Axios.post(`http://localhost:8000/api/editUser/${userId}`, userDataInEdit).then((res)=> console.log(res))
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
              <th className="px-4 py-2">Password</th>
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
                <td className="border px-4 py-2"><input type="text" defaultValue={user.password}  onChange={(e) => {return setUserDataInEdit({...userDataInEdit, "password": e.target.value})}}/></td>
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
                <td className="border px-4 py-2">{user.password}</td>
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
          <tr>
              <th className="px-4 py-2">Add User</th>
              <th className="px-4 py-2"><input type="text" placeholder='email' className='w-full' onChange={(e) => setUserData({...userData, email: e.target.value})}/></th>
              <th className="px-4 py-2"><input type="text" placeholder='password' className='w-full' onChange={(e) => setUserData({...userData, password: e.target.value})}/></th>
              <th className="px-4 py-2"><input type="text" placeholder='address' className='w-full' onChange={(e) => setUserData({...userData, address: e.target.value})}/></th>
              <th className="px-4 py-2">
                <button
                    className="text-blue-500 hover:text-blue-600 mr-2"
                    onClick={() => handleAddUser()}
                  >
                    Submit
                  </button></th>
            </tr>
            </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserManagement;