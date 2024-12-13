import axios from "axios";
import React, { useState } from "react";

const UpdatePopup = ({ todo, onClose, onUpdate }) => {
    const [error, setError] = useState(null);
    const [newTodo, setNewTodo] = useState(todo.title || ""); // Initialize with current title
    const [dueDate, setDueDate] = useState(todo.date || ""); // Initialize with current date

    const updateTodo = async () => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/todo/update/${todo._id}`,
                { title: newTodo, date: dueDate, completed: todo.completed },
                {
                    withCredentials: true,
                }
            );
            const data = response.data.todo;
            onUpdate(data); // Notify parent with the updated todo
            onClose(); // Close the modal
        } catch (error) {
            setError("Failed to update todo");
        }
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 m-4">
                <input
                    className="flex-grow p-2 border rounded focus:outline-none"
                    type="text"
                    placeholder="Add a new todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <input
                    className="flex-grow p-2 border rounded focus:outline-none"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <button
                    className="bg-blue-600 border rounded text-white px-2 py-2 hover:bg-blue-900 duration-300"
                    onClick={updateTodo}
                >
                    Update
                </button>
                {/* <button
                    className="bg-blue-600 border rounded text-white px-2 py-2 hover:bg-blue-900 duration-300"
                    onClick={onClose}
                >
                    Cancel
                </button> */}
            </div>
        </div>
    );
};

export default UpdatePopup;
