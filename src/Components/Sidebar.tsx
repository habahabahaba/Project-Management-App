// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
// Context:
// Hooks:
// Components:
import ProjectsList from "./ProjectsList";
// CSS:
// Types, interfaces and enumns:
import type { FC } from "react";
interface SidebarProps {
  onCreateNewProject: () => void;
}
const Sidebar: FC<SidebarProps> = ({ onCreateNewProject }) => {
  // JSX:
  return (
    <aside className='w-1/3 rounded-r-xl bg-stone-900 px-8 py-16 text-stone-50 md:w-72'>
      <h2 className='mb-8 font-bold text-stone-200 uppercase md:text-xl'>
        Your Projects
      </h2>
      <button
        onClick={onCreateNewProject}
        className='rounded-md bg-stone-700 px-4 py-2 text-xs text-stone-400 hover:bg-stone-600 hover:text-stone-100 md:text-base'
      >
        + Add project
      </button>
      <ProjectsList />
    </aside>
  );
};

export default Sidebar;
