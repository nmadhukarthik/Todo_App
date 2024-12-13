import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UpdatePopup from "./updatePopup";

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [newTodo, setNewtodo] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [modalTodo, setModalTodo] = useState(null); // To track the todo being updated

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/todo/fetchTodos`,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                setTodos(response.data.todos);
                console.log(response.data);
                setError(null);
            } catch (error) {
                setError("Error in fetching todos");
            } finally {
                setLoading(false);
            }
        };
        fetchTodos();
    }, []);

    const createTodo = async () => {
        try {
            if (!newTodo) return; //|| !dueDate
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/todo/create`,
                {
                    title: newTodo,
                    date: dueDate,
                    completed: false,
                },
                {
                    withCredentials: true,
                }
            );
            setTodos([...todos, response.data.newTodo]);
            setDueDate("");
            setNewtodo("");
        } catch (error) {
            setError("Error in creating todos");
        }
    };

    const todoStatus = async (id) => {
        const todo = todos.find((t) => t._id === id);
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/todo/update/${id}`,
                {
                    ...todo,
                    completed: !todo.completed,
                },
                {
                    withCredentials: true,
                }
            );
            setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
        } catch (error) {
            setError("Failed to find todo status");
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/todo/delete/${id}`,
                {
                    withCredentials: true,
                }
            );
            setTodos(todos.filter((t) => t._id !== id));
        } catch (error) {
            setError("Failed to delete todo");
        }
    };

    const logout = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/logout`, {
                withCredentials: true,
            });
            toast.success("Logged out successfully");
            localStorage.removeItem("jwt");
            navigate("/login");
        } catch (error) {
            toast.error("Error logging out");
        }
    };

    const handleUpdateTodo = (updatedTodo) => {
        setTodos((prevTodos) =>
            prevTodos.map((t) => (t._id === updatedTodo._id ? updatedTodo : t))
        );
        setModalTodo(null);
    };

    const remainingTodos = todos.filter((todo) => !todo.completed).length;

    return (
        <div className="mt-10 bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6">
            <h1 className="text-2xl font-semibold text-center"> Todo App </h1>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 m-4">
                <input
                    className="flex-grow p-2 border rounded focus:outline-none"
                    type="text"
                    placeholder="Add a new todo"
                    value={newTodo}
                    onChange={(e) => setNewtodo(e.target.value)}
                />
                <input
                    className="flex-grow p-2 border rounded focus:outline-none"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && createTodo()}
                />
                <button
                    className="bg-blue-600 border rounded text-white px-4 py-2 hover:bg-blue-900 duration-300"
                    onClick={() => createTodo()}
                >
                    Add
                </button>
            </div>

            {loading ? (
                <div className="text-center justify-center">
                    <span className="text-gray-500">Loading....</span>
                </div>
            ) : error ? (
                <div className="text-red-600 text-center font-semibold">
                    {error}
                </div>
            ) : (
                <ul className="space-y-2">
                    {todos.map((todo, index) => (
                        <li
                            key={todo._id || index}
                            className="flex items-center justify-between  p-3 bg-gray-100 rounded-md "
                        >
                            <div className="flex flex-1 items-center">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={todo.completed}
                                    onChange={() => todoStatus(todo._id)}
                                />
                                <span
                                    className={`${
                                        todo.completed
                                            ? "line-through text-gray-400"
                                            : ""
                                    } `}
                                >
                                    {" "}
                                    {todo.title}{" "}
                                </span>
                            </div>
                            <span
                                className={`${
                                    todo.completed
                                        ? "line-through text-gray-400"
                                        : ""
                                } flex-1 text-center `}
                            >
                                {todo.date}
                            </span>
                            <button
                                className="text-green-500 hover:text-green-800 flex-1 text-right "
                                onClick={() => setModalTodo(todo)}
                            >
                                {" "}
                                Update{" "}
                            </button>

                            <button
                                className="text-red-500 hover:text-red-800 flex-1 text-right "
                                onClick={() => deleteTodo(todo._id)}
                            >
                                {" "}
                                Delete{" "}
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <p className="mt-4 text-center text-sm text-gray-700">
                {" "}
                {remainingTodos} remaining todos{" "}
            </p>
            <button
                onClick={() => logout()}
                className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 duration-500 mx-auto block"
            >
                Logout
            </button>

            {modalTodo && (
                <UpdatePopup
                    todo={modalTodo}
                    onClose={() => setModalTodo(null)}
                    onUpdate={handleUpdateTodo}
                />
            )}
        </div>
    );
};

export default Home;
