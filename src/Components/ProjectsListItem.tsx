// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
import { use } from "react";
// Context:
import projectsLocalCtx from "../context/projectsLocalCtx";
// Hooks:
// Components:
// CSS:
// Types, interfaces and enumns:
import type { FC } from "react";
interface ProjectsListItemProps {
  projectId: string;
  title: string;
}

const ProjectsListItem: FC<ProjectsListItemProps> = ({ projectId, title }) => {
  const { selectedId, selectId } = use(projectsLocalCtx) || {
    selectedId: null,
    selectId() {},
  };
  const selected = selectedId === projectId;
  // JSX:
  return (
    <li className='my-4 flex justify-between'>
      <button
        className={`my-1 w-full rounded-sm px-2 py-1 text-left text-stone-${selected ? "200" : "400"} hover:bg-stone-800 hover:text-stone-200`}
        onClick={() => {
          selectId(projectId);
        }}
      >
        {title}
      </button>
    </li>
  );
};

export default ProjectsListItem;
