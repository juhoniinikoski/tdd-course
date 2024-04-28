import * as React from "react";

interface TaskInputProps {
  handleSubmit: (taskTitle: string) => Promise<void>;
}

export function TaskInput({ handleSubmit }: TaskInputProps) {
  const [task, setTask] = React.useState<string>("");

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await handleSubmit(task);
      }}
      className="input-row"
    >
      <input
        aria-label="task-input"
        value={task}
        onChange={(event) => setTask(event.target.value)}
        placeholder="Do the dishes..."
      ></input>
      <button disabled={task.length === 0} aria-label="task-submit-button" type="submit">
        Add task
      </button>
    </form>
  );
}
