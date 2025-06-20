import { createNewElement, Fragment } from "../createElement.js";
import { useState } from "../hooks/useState.js";

export function ToDoList() {
  const [tasks, setTask] = useState(["Task1"]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(e) {
    setNewTask(e.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "" && !tasks.includes(newTask.trim().toLowerCase())) {
      setTask(t => [...t, newTask.trim()]);
    }
    setNewTask("");
  }

  function deleteTask(index) {
    const updated = tasks.filter((_, i) => i !== index);
    setTask(updated);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updated = [...tasks];
      [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
      setTask(updated);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updated = [...tasks];
      [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
      setTask(updated);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white font-sans flex flex-col items-center pt-24 pb-24">
      <h1 className="text-5xl font-bold mb-8">To Do List</h1>

      <div className="flex items-center mb-6">
        <input
          type="text"
          className="text-lg px-4 py-2 rounded border-2 border-zinc-400 text-black"
          placeholder="Enter your Task..."
          value={newTask}
          onInput={handleInputChange}
        />
        <button
          className="ml-4 px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded"
          onClick={addTask}
        >
          Add
        </button>
      </div>
        
      <ol className="space-y-4">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="bg-zinc-100 text-black text-xl font-bold p-4 rounded w-[600px] flex items-center justify-between border-2 border-zinc-300"
          >
            <span className="flex-1">{task}</span>
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-base rounded"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-base rounded"
                onClick={() => moveTaskUp(index)}
              >
                ☝️
              </button>
              <button
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-base rounded"
                onClick={() => moveTaskDown(index)}
              >
                👇
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}


