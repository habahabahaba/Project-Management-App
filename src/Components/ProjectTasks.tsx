// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
import { use, useActionState } from "react";
// Context:
import projectsLocalCtx from "../context/projectsLocalCtx";
// Hooks:
// Components:
import TasksList from "./TasksList";
// CSS:
// Types, interfaces and enumns:
import type { FC } from "react";
import type { Task } from "../context/projects.types";
interface ProjectTasksProps {
  projectId: string;
  tasks: Task[];
}

const ProjectTasks: FC<ProjectTasksProps> = ({ projectId, tasks }) => {
  //   State:
  const unclearedTasks = tasks.filter((task) => !task.cleared);

  // Handlers:
  const { localDispatch } = use(projectsLocalCtx);
  function handleClearTask(taskId: string): void {
    localDispatch({ type: "CLEAR_TASK", payload: { projectId, taskId } });
  }

  //   Form logic:
  //   For the task title input:
  async function addTask(
    currentState: string,
    formData: FormData,
  ): Promise<string> {
    // Validation:
    let title = formData.get("task_title");
    if (typeof title !== "string") return "please enter a title";
    title = title.trim();
    if (!title) return "please enter a title";

    localDispatch({
      type: "ADD_TASK",
      payload: { projectId, title },
    });

    return "";
  }

  const [formState, formAction, isPending] = useActionState(addTask, "");

  // JSX:
  return (
    <>
      <h2 className='my-4 text-xl font-bold text-stone-700'>Tasks</h2>
      <div className='flex items-center justify-between'>
        <form action={formAction}>
          <input
            type='text'
            id='task_title'
            name='task_title'
            placeholder={formState || ""}
            className='w-64 rounded-sm bg-stone-200 px-2 py-1'
          />
          <button
            disabled={isPending}
            className='mx-5 text-stone-700 hover:text-stone-950 disabled:text-stone-300'
          >
            Add Task
          </button>
        </form>
      </div>
      {unclearedTasks.length ? (
        <TasksList
          projectId={projectId}
          tasks={unclearedTasks}
          onClear={handleClearTask}
        />
      ) : (
        <p className='mt-8'> This project does not have any tasks yet.</p>
      )}
    </>
  );
};

export default ProjectTasks;
