import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = () => {
    if (!input.trim()) return;

    if (editIndex !== null) {
      setTodos((prev) =>
        prev.map((todo, index) =>
          index === editIndex ? input : todo
        )
      );
      setEditIndex(null);
    } else {
      setTodos((prev) => [...prev, input]);
    }

    setInput("");
  };

  const handleEdit = (indexToEdit) => {
    setInput(todos[indexToEdit]);
    setEditIndex(indexToEdit);
  };

  const handleDelete = (indexToDelete) => {
    setTodos((prev) =>
      prev.filter((todo, index) => index !== indexToDelete)
    );

    if (editIndex === indexToDelete) {
      setInput("");
      setEditIndex(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center pt-16 px-4">
      
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 h-fit">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Todo App
        </h1>

        {/* Input + Button */}
        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Add a todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-3">
          {todos.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3"
            >
              <span className="text-gray-700">
                {item}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default App;