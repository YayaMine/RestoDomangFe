"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, List, Calendar, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import axios from "@/lib/axios";
import Swal from "sweetalert2";

const UserManagementPage = () => {
  const { user, logout } = useAuth({ middleware: "auth" });
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ email: "", name: "", role: "member", password: "" });
  const [editingUser, setEditingUser] = useState(null);
  const [errors, setErrors] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  

// Function to handle create or update
const handleCreateOrUpdate = async () => {
  setErrors([]);
  try {
    if (editingUser) {
      await axios.put(`/api/users/${editingUser.id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "User updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      await axios.post("/api/users", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "User created successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setFormData({ email: "", name: "", role: "member", password: "" });
    setEditingUser(null);
    await fetchUsers();
  } catch (error) {
    if (error.response?.status === 422) {
      setErrors(error.response.data.errors);
    } else {
      console.error("Failed to create or update user:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create or update user.",
        confirmButtonText: "OK",
      });
    }
  }
};

// Function to handle edit
const handleEdit = (user) => {
  setEditingUser(user);
  setFormData({ email: user.email, name: user.name, role: user.role, password: "" });
  Swal.fire({
    icon: "info",
    title: "Editing User",
    text: `You are editing the user: ${user.name}`,
    showConfirmButton: true,
  });
};

// Function to handle delete
const handleDelete = async (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/users/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "User deleted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        await fetchUsers();
      } catch (error) {
        console.error("Failed to delete user:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete user.",
          confirmButtonText: "OK",
        });
      }
    }
  });
};

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 text-center border-b">
          <Image
            src="/logo.svg"
            alt="Domang Sushi"
            width={64}
            height={64}
            className="mx-auto mb-2"
          />
          <h1 className="text-xl font-bold text-orange-600">DOMANG SUSHI</h1>
        </div>
        <nav className="mt-6">
          <ul>
            <li className="mb-2">
              <Link
                href="/admin"
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-orange-100"
              >
                <Home className="w-5 h-5 mr-2" />
                Dashboard
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/admin/menu"
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-orange-100"
              >
                <List className="w-5 h-5 mr-2" />
                Menus
              </Link>
            </li>
            <li>
              <Link
                href="/admin/reservasi"
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-orange-100"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Reservation
              </Link>
            </li>
            <li>
              <Link
                href="/admin/tableReservation"
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-200"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Table
              </Link>
            </li>
            <li>
              <Link
                href="/admin/user"
                className="flex items-center px-4 py-2 text-white bg-orange-500 rounded-md"
              >
                <User className="w-5 h-5 mr-2" />
                User
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 mt-4 text-gray-700 rounded-md hover:bg-orange-100"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Mange user</h1>
            <p className="text-sm text-gray-500">Manage User and admin</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>

        <section className="p-6 bg-white rounded-md shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">Add / Edit User</h2>
          <form className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2 md:grid-cols-3">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="p-2 border rounded"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
          </form>
          <button
            onClick={handleCreateOrUpdate}
            className="px-4 py-2 text-white bg-blue-500 rounded"
          >
            {editingUser ? "Update User" : "Create User"}
          </button>
          {errors.length > 0 && (
            <div className="mt-4 text-red-500">
              {Object.entries(errors).map(([key, messages], index) => (
                <p key={index}>{messages}</p>
              ))}
            </div>
          )}
        </section>

        <section className="p-6 mt-6 bg-white rounded-md shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">User List</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="flex gap-2 p-3">
                      <button
                        onClick={() => handleEdit(user)}
                        className="px-3 py-1 text-white bg-green-500 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-3 py-1 text-white bg-red-500 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserManagementPage;
