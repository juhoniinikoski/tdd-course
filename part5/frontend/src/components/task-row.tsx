import { Task } from "../utils/types";

interface TaskRowProps {
  task: Task;
}

export function TaskRow({ task }: TaskRowProps) {
  return (
    <div className="task-row">
      <p>{task.title}</p>
    </div>
  );
}
