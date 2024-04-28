import * as React from "react";
import { Task } from "../utils/types";
import { Icons } from "./icons";

interface TaskRowProps {
  task: Task;
  handleArchive: (taskID: string) => Promise<{ status: "ok" | "error" }>;
  handleRename: (taskID: string, newTitle: string) => Promise<{ status: "ok" | "error" }>;
}

export function TaskRow({ task, handleArchive }: TaskRowProps) {
  const [isEditing] = React.useState<boolean>(false);

  return (
    <div className="task-row">
      <p>{task.title}</p>
      {!isEditing && (
        <div className="task-row-button-container">
          <button className="icon-button" aria-label="rename-button">
            <Icons.edit className="icon" />
          </button>
          <button onClick={() => handleArchive(task.id)} className="icon-button" aria-label="archive-button">
            <Icons.archive className="icon" />
          </button>
        </div>
      )}
    </div>
  );
}
