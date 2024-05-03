import * as React from "react";
import { Task } from "../utils/types";
import { Icons } from "./icons";
import { toast } from "react-hot-toast";

interface TaskRowProps {
  task: Task;
  handleArchive: (taskID: string) => Promise<{ status: "ok" | "error" }>;
  handleRename: (taskID: string, newTitle: string) => Promise<{ status: "ok" | "error" }>;
  handleComplete: (taskID: string) => Promise<{ status: "ok" | "error" }>;
}

export function TaskRow({ task, handleArchive, handleRename, handleComplete }: TaskRowProps) {
  const [taskTitle, setTaskTitle] = React.useState<string>(task.title);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  if (task.archived) {
    return (
      <div className="task-row">
        <input readOnly value={taskTitle} />
      </div>
    );
  }

  return (
    <form
      className="task-row"
      onSubmit={async (e) => {
        e.preventDefault();
        const { status } = await handleRename(task.id, taskTitle);
        if (status === "ok") {
          toast.success("Renamed the task successfully.");
          setIsEditing(false);
        } else {
          toast.error("Unexpected error.");
        }
      }}
    >
      <div className="input-container">
        <button aria-label="complete-button" onClick={() => handleComplete(task.id)} type="button">
          {task.completed ? <Icons.circleCheck className="icon" /> : <Icons.circle className="icon" />}
        </button>
        <input
          style={task.completed ? { textDecorationLine: "line-through" } : {}}
          aria-label="title-input"
          readOnly={!isEditing}
          value={taskTitle}
          onChange={(event) => setTaskTitle(event.target.value)}
        />
      </div>
      {!isEditing ? (
        <div className="task-row-button-container">
          <button onClick={() => setIsEditing(true)} type="button" className="icon-button" aria-label="edit-button">
            <Icons.edit className="icon" />
          </button>
          <button
            type="button"
            onClick={async () => {
              const { status } = await handleArchive(task.id);
              if (status === "ok") {
                toast.success("Task archived successfully.");
              } else {
                toast.error("Unexpected error.");
              }
            }}
            className="icon-button"
            aria-label="archive-button"
          >
            <Icons.archive className="icon" />
          </button>
        </div>
      ) : (
        <div className="task-row-button-container">
          <button
            type="button"
            onClick={async (e) => {
              e.preventDefault();
              const { status } = await handleRename(task.id, taskTitle);
              if (status === "ok") {
                toast.success("Renamed the task successfully.");
                setIsEditing(false);
              } else {
                toast.error("Unexpected error.");
              }
            }}
            disabled={taskTitle.length === 0}
            className="icon-button"
            style={{ backgroundColor: "green", opacity: taskTitle.length === 0 ? 0.75 : 1 }}
            aria-label="rename-button"
          >
            <Icons.check className="icon" />
          </button>
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setTaskTitle(task.title);
            }}
            className="icon-button"
            aria-label="cancel-button"
            style={{ backgroundColor: "red" }}
          >
            <Icons.close className="icon" />
          </button>
        </div>
      )}
    </form>
  );
}
