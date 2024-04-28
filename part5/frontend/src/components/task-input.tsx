import * as React from "react";
import { Icons } from "./icons";
import { toast } from "react-hot-toast";

interface TaskInputProps {
  handleSubmit: (taskTitle: string) => Promise<{ status: "ok" | "error" }>;
}

export function TaskInput({ handleSubmit }: TaskInputProps) {
  const [task, setTask] = React.useState<string>("");

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const { status } = await handleSubmit(task);
        if (status === "ok") {
          setTask("");
          toast.success("New task created");
        } else {
          toast.success("Error creating new task");
        }
      }}
      className="input-row"
    >
      <input
        aria-label="task-input"
        value={task}
        onChange={(event) => setTask(event.target.value)}
        placeholder="I am a placeholder..."
      ></input>
      <button disabled={task.length === 0} aria-label="task-submit-button" type="submit">
        <Icons.add className="icon-left" />
        Add task
      </button>
    </form>
  );
}
