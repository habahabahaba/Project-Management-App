// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
// Context:
// Hooks:
// Components:
import TasksListItem from "./TasksListItem";
// CSS:
// Types, interfaces and enumns:
import type { FC } from "react";
import type { Task } from "../context/projects.types";
interface TasksListProps {
  projectId: string;
  tasks: Task[];
  onClear: (taskId: string) => void;
}

const TasksList: FC<TasksListProps> = ({ projectId, tasks, onClear }) => {
  // JSX:
  const list = tasks.map((task) => (
    <TasksListItem
      key={task.taskId}
      task={task}
      projectId={projectId}
      onClear={onClear}
    />
  ));

  return <ul className='mt-8 rounded-md bg-stone-100 p-4'>{list}</ul>;
};

export default TasksList;
