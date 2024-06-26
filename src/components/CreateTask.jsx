import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from 'react-hot-toast';
import { useTaskContext } from "../context/TaskContext";

const CreateTask = () => {

  const { tasks, setTasks } = useTaskContext();

  // Inisialisasi tasks sebagai array kosong jika tidak diberikan prop
  // if (!tasks) tasks = [];

  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo", // bisa juga sedang berlangsung atau ditutup
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if(task.name.length < 3) return toast.error("A Task must have more than 3 character");

    if(task.name.length > 100) return toast.error("A Task must not be more than 100 character");

    setTasks((prev) => {
      const list = [...prev, task];

      localStorage.setItem("tasks", JSON.stringify(list));

      return list;
    });

    toast.success("Task Created");

    setTask({
      id: "",
      name: "",
      status: "todo",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="pt-8">
      <input
        type="text"
        className="mr-4 h-12 w-64 rounded-md border-2 border-slate-700 bg-slate-100 px-1 dark:border-secDarkColor"
        value={task.name}
        onChange={(e) =>
          setTask({ ...task, id: uuidv4(), name: e.target.value })
        }
      />
      <button className="font-primary font-semibold h-12 rounded-md bg-primaryColor px-4 text-white dark:bg-secDarkColor dark:text-white dark:hover:bg-thirdDarkColor dark:shadow-sm dark:shadow-slate-950">
        Create
      </button>
    </form>
  );
};
export default CreateTask;
