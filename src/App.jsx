import { TaskProvider } from "./context/TaskContext";
import { useEffect, useState } from "react";
import NavbarTask from "./components/NavbarTask";
import CreateTask from "./components/CreateTask";
import ListTask from "./components/ListTask";
import FooterTask from "./components/FooterTask";
import toast, { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [tasks, setTasks] = useState([]);

  console.log("tasks", tasks);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);

  return (
    <TaskProvider>
      <DndProvider backend={HTML5Backend}>
        <Toaster />
        <div className="flex h-screen w-screen flex-col items-center gap-16 bg-primaryBackgroundColor p-3 pt-32">
          <NavbarTask />
          <CreateTask tasks={tasks} setTasks={setTasks} />
          <ListTask tasks={tasks} setTasks={setTasks} />
        </div>
        <div>
          <FooterTask />
        </div>
      </DndProvider>
    </TaskProvider>
  );
}

export default App;