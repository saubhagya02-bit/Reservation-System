import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../api/api";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/suth/login", { username, password });
            localStorage.setItem("token", res.data.token);
            navigate("/rooms");
        } catch {
            alert("Invalid credentials");
        }
    };

  return (
    <div className='flex justify-center items-center h-screen'>
        <form onSubmit={login} className='bg-white p-6 shadow rounded w-80'>
            <h2 className='text-xl mb-4'>Login</h2>
            <input className='border w-full p-2 mb-3' placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
            <input type="password" className='border w-full p-2 mb-3' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <button className='bg-blue-500 text-white w-full p-2 rounded'>Login</button>
        </form>
    </div>
  );
}
