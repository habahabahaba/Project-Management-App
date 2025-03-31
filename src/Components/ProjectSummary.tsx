// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
import { useMemo } from "react";
// Context:
// Hooks:
// Components:
// CSS:
// Types, interfaces and enumns:
import type { FC } from "react";
import { Project } from "../context/projects.types";
type ProjectSummaryProps = Pick<
  Project,
  "projectId" | "title" | "description"
> & { dueDate: number | Date } & { onDelete: () => void }; // dueDate: Date - for later expansion.

const ProjectSummary: FC<ProjectSummaryProps> = ({
  projectId,
  title,
  description,
  dueDate,
  onDelete,
}) => {
  // DEV, for later use of projectId:
  console.log("[ProjectSummary]: projectId: ", projectId);
  console.log("[ProjectSummary]: dueDate: ", dueDate);

  const localeDate = useMemo(() => {
    const dateObj = dueDate instanceof Date ? dueDate : new Date(dueDate);
    return dateObj.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [dueDate]);

  // JSX:
  return (
    <header className='mb-4 border-b-2 border-stone-300 pb-4'>
      <div className='flex items-center justify-between'>
        <h2 className='mb-4 text-2xl font-bold text-stone-700'>{title}</h2>
        <button
          onClick={onDelete}
          className='text-stone-800 hover:text-red-500'
        >
          Delete
        </button>
      </div>
      <p className='mb-4 text-stone-400'>{localeDate}</p>
      <p className='whitespace-pre-wrap text-stone-600'>{description}</p>
    </header>
  );
};

export default ProjectSummary;
