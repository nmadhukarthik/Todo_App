import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BACKENDURL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // console.log(import.meta.env.VITE_BACKEND_URL);
    const navigateTo = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${BACKENDURL}/user/login`,
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            // console.log(import.meta.env.VITE_BACKEND_URL);
            console.log("Login Response:", data);
            localStorage.setItem("username", data.user.username);
            toast.success(data.message || "User logged in successfully");
            localStorage.setItem("jwt", data.token);
            setEmail("");
            setPassword("");
            navigateTo("/");
            window.location.reload();
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.errors || error.response?.data?.message
            );
        }
    };

    return (
        <div>
            <div>
                <div className="flex h-screen items-center justify-center bg-gray-100 ">
                    <div className="w-full max-w-md p-8 bg-white rounded-lg">
                        <h2 className="text-2xl font-semibold mb-5 text-center">
                            Login
                        </h2>
                        <form onSubmit={handleLogin}>
                            {/* email */}
                            <div className="mb-4">
                                <label
                                    className="block mb-2 font-semibold"
                                    htmlFor=""
                                >
                                    {" "}
                                    Email{" "}
                                </label>
                                <input
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2"
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {/* password */}
                            <div className="mb-4">
                                <label
                                    className="block mb-2 font-semibold"
                                    htmlFor=""
                                >
                                    {" "}
                                    Password{" "}
                                </label>
                                <input
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2"
                                    type="password"
                                    placeholder="Enter your password"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white hover:bg-blue-900 duration-300 rounded-xl font-semibold p-3"
                            >
                                Login
                            </button>
                            <p className="mt-4 text-center text-gray-600">
                                Don't have account?
                                <Link
                                    to="/signup"
                                    className="text-blue-600 hover:underline"
                                >
                                    Signup
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
