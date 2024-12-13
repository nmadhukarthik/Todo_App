import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigateTo = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/user/signup`,
                {
                    username,
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
            console.log(data);
            toast.success(data.message || "User registered successfully");
            localStorage.setItem("jwt", data.token);
            setUsername("");
            setEmail("");
            setPassword("");
            navigateTo("/login");
        } catch (error) {
            console.log(error);
            toast.error(
                error.response.data.errors || error.response.data.message
            );
        }
    };

    return (
        <div>
            <div>
                <div className="flex h-screen items-center justify-center bg-gray-100 ">
                    <div className="w-full max-w-md p-8 bg-white rounded-lg">
                        <h2 className="text-2xl font-semibold mb-5 text-center">
                            Signup
                        </h2>
                        <form onSubmit={handleRegister}>
                            {/* username */}
                            <div className="mb-4">
                                <label
                                    className="block mb-2 font-semibold"
                                    htmlFor=""
                                >
                                    {" "}
                                    Username{" "}
                                </label>
                                <input
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2"
                                    type="text"
                                    placeholder="Enter your username"
                                    required
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
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
                                    type="text"
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
                                Signup
                            </button>
                            <p className="mt-4 text-center text-gray-600">
                                Already have account?
                                <Link
                                    to="/login"
                                    className="text-blue-600 hover:underline"
                                >
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
