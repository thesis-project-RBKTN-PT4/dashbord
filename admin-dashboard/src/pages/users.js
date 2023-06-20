import React, { useState, useEffect } from 'react';
import Link from "next/link";
import axios from 'axios';
import { useRouter } from "next/router";

export default function Users() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  const reverseRole = (str) =>str==="true"?"false":"true"
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get('http://localhost:8080/admin/users')
      .then(res => {
        setUsers(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteUser = id => {
    axios
      .delete(`http://localhost:8080/user/${id}`)
      .then(() => {
        fetchUsers();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const toggleAdmin = (id, isAdmin) =>{
    console.log(isAdmin)
    axios.put(`http://localhost:8080/admin/${id}`,{isAdmin})
    .then(()=>fetchUsers())
    .catch(error=>console.log(error))
  }
  const handleReturnHome = () => {
    router.push("Home");
  };
  return (
    <main className="bg-blue-500 ">
    <div className="p-4 mr-4">
      <button
        onClick={handleReturnHome}
        className="bg-white text-blue-500 ml-5 py-2 px-4 rounded "
      >
        Return to Home Page
      </button>
    </div>
    <div className="bg-blue-500 min-h-screen flex flex-col items-center justify-center">
    <h1 className="text-6xl text-white font-bold my-8">EASYMED</h1>
      <h1 className="text-6xl text-black my-8">All Users</h1>
      <div className="bg-white p-8 rounded-lg">
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2">Role</th>
              <th className="py-2">Email</th>
              <th className="py-2">Created At</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="py-2">{user.name}</td>
                <td className="py-2">{user.role}</td>
                <td className="py-2">{user.email}</td>
                <td className="py-2">{user.createdAt}</td>
                <td className="py-2">
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                  >
                    Delete
                  </button>
                  {user.isAdmin==="true"?
                  <button
                    onClick={() => toggleAdmin(user.id,reverseRole(user.isAdmin))}
                    className="bg-green-500 text-white py-2 px-4 rounded"
                  >
                    Remove Admin
                  </button>
                  :
                  <button
                    onClick={() => toggleAdmin(user.id,reverseRole(user.isAdmin))}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Add Admin
                  </button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </main>
  );
}
