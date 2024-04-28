import * as React from "react";
import "./App.css";
import { Task } from "./utils/types";
import { TaskInput } from "./components/task-input";
import { TaskRow } from "./components/task-row";

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

  const handleSubmit = async (taskTitle: string): Promise<{ status: "ok" | "error"; error?: string }> => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await fetch(`/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: taskTitle }),
        signal: signal,
      });

      if (!response.ok) {
        throw new Error(`Failed to create task: ${response.statusText}`);
      }

      const newTask = await response.json();

      setTasks((oldState) => [...oldState, newTask as Task]);

      return { status: "ok" };
    } catch (error) {
      return { status: "error" };
    } finally {
      controller.abort();
    }
  };

  if (loading) {
    return <></>;
  }

  return (
    <>
      <h1>My todo app</h1>
      <div className="card">
        <TaskInput handleSubmit={handleSubmit} />
        <div className="task-container">
          {tasks.map((t) => (
            <TaskRow key={t.id} task={t} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
