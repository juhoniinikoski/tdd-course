import * as React from "react";
import "./App.css";
import { Task } from "./utils/types";
import { TaskInput } from "./components/task-input";
import { TaskRow } from "./components/task-row";

function App() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const apiUrl = import.meta.env.VITE_API_URL ?? "";

  console.log(import.meta.env);

  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/tasks`, { signal });
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data);
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [apiUrl]);

  const handleSubmit = async (taskTitle: string): Promise<{ status: "ok" | "error" }> => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await fetch(`${apiUrl}/api/tasks`, {
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

  const handleComplete = async (taskID: string): Promise<{ status: "ok" | "error" }> => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await fetch(`${apiUrl}/api/tasks/complete`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskID }),
        signal: signal,
      });

      if (!response.ok) {
        throw new Error(`Failed to complete task: ${response.statusText}`);
      }

      setTasks((oldTasks) => oldTasks.map((t) => (t.id === taskID ? { ...t, completed: !t.completed } : t)));

      return { status: "ok" };
    } catch (error) {
      return { status: "error" };
    } finally {
      controller.abort();
    }
  };

  const handleArchiveCompleted = async (): Promise<{ status: "ok" | "error" }> => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await fetch(`${apiUrl}/api/tasks/archive-completed`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        signal: signal,
      });

      if (!response.ok) {
        throw new Error(`Failed to archive tasks: ${response.statusText}`);
      }

      setTasks((oldTasks) =>
        oldTasks.map((t) => (t.archived === false && t.completed === true ? { ...t, archived: true } : t)),
      );

      return { status: "ok" };
    } catch (error) {
      return { status: "error" };
    } finally {
      controller.abort();
    }
  };

  const handleArchive = async (taskID: string): Promise<{ status: "ok" | "error" }> => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await fetch(`${apiUrl}/api/tasks/archive`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskID }),
        signal: signal,
      });

      if (!response.ok) {
        throw new Error(`Failed to archive task: ${response.statusText}`);
      }

      setTasks((oldTasks) => oldTasks.map((t) => (t.id === taskID ? { ...t, archived: true } : t)));

      return { status: "ok" };
    } catch (error) {
      return { status: "error" };
    } finally {
      controller.abort();
    }
  };

  const handleRename = async (taskID: string, newTitle: string): Promise<{ status: "ok" | "error" }> => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await fetch(`${apiUrl}/api/tasks/rename`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskID, newTitle }),
        signal: signal,
      });

      if (!response.ok) {
        throw new Error(`Failed to rename task: ${response.statusText}`);
      }

      setTasks((oldTasks) => oldTasks.map((t) => (t.id === taskID ? { ...t, title: newTitle } : t)));

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

  const nonArchivedTasks = tasks.filter((task) => !task.archived);
  const archivedTasks = tasks.filter((task) => task.archived);

  return (
    <>
      <h1>My todo app</h1>
      <div className="card">
        <TaskInput
          allTasks={nonArchivedTasks}
          handleArchiveCompleted={handleArchiveCompleted}
          handleSubmit={handleSubmit}
        />
        <div className="task-container">
          {nonArchivedTasks.map((t) => (
            <TaskRow
              key={t.id}
              task={t}
              handleArchive={handleArchive}
              handleRename={handleRename}
              handleComplete={handleComplete}
            />
          ))}
        </div>
        {archivedTasks.length !== 0 && (
          <>
            <p>Archived:</p>
            <div className="task-container">
              {archivedTasks.map((t) => (
                <TaskRow
                  key={t.id}
                  task={t}
                  handleArchive={handleArchive}
                  handleRename={handleRename}
                  handleComplete={handleComplete}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
