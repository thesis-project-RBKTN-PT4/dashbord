import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";
import Sidebar from "./SideBar";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const router = useRouter();

  const reverseRole = (str) => str === "true" ? "false" : "true";

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchQuery, roleFilter]);

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

  const toggleAdmin = (id, isAdmin) => {
    console.log(isAdmin);
    axios
      .put(`http://localhost:8080/admin/${id}`, { isAdmin })
      .then(() => fetchUsers())
      .catch(error => console.log(error));
  };

  const handleReturnHome = () => {
    router.push("Home");
  };

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  const handleRoleFilterChange = e => {
    setRoleFilter(e.target.value);
  };

  const filterUsers = () => {
    let filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (roleFilter === '' || user.role.toLowerCase() === roleFilter.toLowerCase())
    );
    setFilteredUsers(filtered);
  };
  // ...

  return (
    <main className="bg-blue-100 flex flex-row">
      <Sidebar />
      <div className="bg-blue-100 min-h-screen flex flex-col items-center justify-center ml-40">
        <h1 className="text-6xl text-blue-800 font-bold my-8">EASYMED</h1>
        <div className="flex-grow flex items-center justify-center"> {/* Updated styling */}
          <div className="bg-white p-8 rounded-lg w-full">
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Search by name"
                className="py-2 px-4 border border-gray-300 rounded mr-2"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <select
                className="py-2 px-4 border border-gray-300 rounded"
                value={roleFilter}
                onChange={handleRoleFilterChange}
              >
                <option value="">All users</option>
                <option value="doctor">Doctors</option>
                <option value="patient">Patients</option>
              </select>
            </div>
            <table className="w-full">
  <thead>
    <tr>
      <th className="py-3 px-6 text-left">Name</th>
      <th className="py-3 px-6 text-left">Role</th>
      <th className="py-3 px-6 text-left">Email</th>
      <th className="py-3 px-6 text-left">Created At</th>
      <th className="py-3 px-6 text-left">Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredUsers.map((user, index) => (
      <tr key={index} className="bg-white">
        <td className="py-4 px-6">{user.name}</td>
        <td className="py-4 px-6">{user.role}</td>
        <td className="py-4 px-6">{user.email}</td>
        <td className="py-4 px-6">{new Date(user.createdAt).toLocaleDateString()}</td>
        <td className="py-4 px-6">
          <button
            onClick={() => deleteUser(user.id)}
            className="bg-red-500 text-white py-2 px-4 rounded mr-2"
          >
            Delete
          </button>
          {user.isAdmin === "true" ? (
            <button
              onClick={() => toggleAdmin(user.id, reverseRole(user.isAdmin))}
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Remove Admin
            </button>
          ) : (
            <button
              onClick={() => toggleAdmin(user.id, reverseRole(user.isAdmin))}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Add Admin
            </button>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>
          </div>
        </div>
      </div>
    </main>
  );
}
