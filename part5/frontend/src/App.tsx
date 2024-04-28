import * as React from "react";
import "./App.css";

const apiUrl = "http://localhost:80";

function App() {
  const [task, setTask] = React.useState<string>("");

  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/tasks`, { signal });
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        console.log(data);
        setTasks(data);
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setError(error.message);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(task);
    setTask("");
  };

  return (
    <>
      <h1>My todo app</h1>
      <div className="card">
        <form onSubmit={handleSubmit} className="input-row">
          <input value={task} onChange={(event) => setTask(event.target.value)} placeholder="Do the dishes..."></input>
          <button type="submit">Add task</button>
        </form>
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
