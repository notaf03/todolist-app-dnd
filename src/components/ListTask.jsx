import React from "react";
import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import toast from "react-hot-toast";
import { useTaskContext } from "../context/TaskContext";

const ListTask = () => {
  const { tasks, setTasks } = useTaskContext();

  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    const fTodos = tasks.filter((task) => task.status === "todo");
    const fInProgress = tasks.filter((task) => task.status === "inprogress");
    const fClosed = tasks.filter((task) => task.status === "closed");

    setTodos(fTodos);
    setInProgress(fInProgress);
    setClosed(fClosed);
  }, [tasks]);

  const statuses = ["todo", "inprogress", "closed"];

  return (
    <div className="flex gap-16">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          closed={closed}
        />
      ))}
    </div>
  );
};
export default ListTask;

//DND
const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "Todo";
  let bg = "bg-slate-500";
  let taskToMap = todos;

  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-purple-500";
    taskToMap = inProgress;
  }

  if (status === "closed") {
    text = "Closed";
    bg = "bg-green-500";
    taskToMap = closed;
  }

  const addItemToSection = (id) => {
    setTasks((prev) => {
      const mTasks = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }

        return t;
      });

      localStorage.setItem("tasks", JSON.stringify(mTasks));

      toast('Task Change!', {
        icon: '👏',
      });

      return mTasks;
    });
  };

  return (
    <div
      ref={drop}
      className={`w-64 bg-white dark:bg-secDarkColor dark:shadow-md dark:shadow-slate-950 rounded-md p-2 drop-shadow-lg font-primary ${isOver ? "bg-slate-300" : ""}`}
    >
      {/* header title*/}
      <div className={`sticky top-0 z-10 p-2 pb-4`}>
        <Header text={text} bg={bg} count={taskToMap.length}/>
      </div>
      {/* list task */}
      <div ref={drop} className="max-h-64 pt-[10px] px-4 pb-4 rounded-md overflow-y-auto dark:bg-thirdDarkColor dark:text-white">
        {taskToMap.length > 0 &&
          taskToMap.map((task) => (
            <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks}/>
          ))}
      </div>
    </div>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex h-12 items-center font-semibold rounded-md pl-4 text-sm uppercase text-white`}
    >
      {text}
      <div className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-black">
        {count}
      </div>
    </div>
  );
};

const Task = ({ task, tasks, setTasks }) => {
  // DND
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  console.log(isDragging);
  // Remove Task
  const handleRemove = (id) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);

    toast.error("Task Removed");
  };

  return (
    <div
      ref={drag}
      className={`relative mt-8 cursor-grab rounded-md p-4 shadow-md ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      <p>{task.name}</p>
      <button
        className="absolute bottom-1 right-1 text-slate-400"
        onClick={() => handleRemove(task.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
  );
};
