import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { instance } from '../instance';
import { loginUser } from '../utils/auth';
import { useNavigate } from 'react-router';

const Login = () => {
    const [formState, setFormState] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add login logic here
        try {
            const data = await loginUser(formState)
            console.log(data)
            localStorage.setItem("token", JSON.stringify(data.token))
            navigate("/")
        } catch (error) {
            toast.error(error.response.data.error)
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
            <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formState.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none"
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login