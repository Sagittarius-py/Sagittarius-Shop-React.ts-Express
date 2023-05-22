import React, { useState } from 'react';

interface User {
  id: number;
  name: string;
  isBlocked: boolean;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUserName, setNewUserName] = useState('');

  const handleAddUser = () => {
    if (newUserName.trim() === '') return;

    const newUser: User = {
      id: Date.now(),
      name: newUserName.trim(),
      isBlocked: false,
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
    setNewUserName('');
  };

  const handleDeleteUser = (userId: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const handleToggleBlockUser = (userId: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            isBlocked: !user.isBlocked,
          };
        }
        return user;
      })
    );
  };

  return (
    <div className="w-2/3 h-fit bg-slate-100 rounded-xl p-2">
      <h1 className="text-3xl font-semibold mb-4">User Management</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter user name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 ml-4 rounded"
          onClick={handleAddUser}
        >
          Add User
        </button>
      </div>

      {users.length > 0 ? (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">Blocked</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">
                  {user.isBlocked ? 'Yes' : 'No'}
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="text-red-500 hover:text-red-600 mr-2"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                  <button
                    className={`${
                      user.isBlocked ? 'text-green-500' : 'text-red-500'
                    } hover:text-green-600`}
                    onClick={() => handleToggleBlockUser(user.id)}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
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