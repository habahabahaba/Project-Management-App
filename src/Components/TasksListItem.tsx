// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
// Context:
// Hooks:
// Components:
// CSS:
// Types, interfaces and enumns:
import type { FC } from "react";
import type { Task } from "../context/projects.types";
interface TasksListItemProps {
  projectId: string;
  task: Task;
  onClear: (taskId: string) => void;
}

const TasksListItem: FC<TasksListItemProps> = ({
  projectId,
  task,
  onClear,
}) => {
  // DEV, for later use of projectId:
  console.log("[TasksListItem]: projectId: ", projectId);

  // JSX:
  return (
    <li className='my-4 flex justify-between'>
      {task.title}
      <button
        onClick={() => {
          onClear(task.taskId);
        }}
        className='text-stone-700 hover:text-red-500'
      >
        Clear
      </button>
    </li>
  );
};

export default TasksListItem;
