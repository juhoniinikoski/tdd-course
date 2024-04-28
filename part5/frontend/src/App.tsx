import * as React from "react";
import "./App.css";
import { Task } from "./utils/types";
import { TaskInput } from "./components/task-input";

function App() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/tasks`, { signal });
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data);
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);

  const handleSubmit = async (taskTitle: string) => {
    console.log(taskTitle);
  };

  return (
    <>
      <h1>My todo app</h1>
      <div className="card">
        <TaskInput handleSubmit={handleSubmit} />
        <div>
          {tasks.map((t) => (
            <p>{t.title}</p>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
