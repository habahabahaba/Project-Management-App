// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
// Context:
// Hooks:
// Components:
// CSS:
import noProjectsPNG from "../assets/no-projects.png";
// Types, interfaces and enumns:
import type { FC } from "react";
interface FallbackProps {
  onCreateNewProject: () => void;
}

const Fallback: FC<FallbackProps> = ({ onCreateNewProject }) => {
  // JSX:
  return (
    <div className='mt-24 w-2/3 text-center'>
      <img
        alt='notepad and pen'
        src={noProjectsPNG}
        className='mx-auto h-16 w-16 object-contain'
      />
      <h2 className='my-4 text-xl font-bold text-stone-500'>
        No Project Selected
      </h2>
      <p className='mb-6 text-stone-400'>
        Select a project or get started with a new one
      </p>
      <button
        onClick={() => {
          onCreateNewProject();
        }}
        className='rounded-md bg-stone-700 px-4 py-2 text-xs text-stone-400 hover:bg-stone-600 hover:text-stone-100 md:text-base'
      >
        Create new project
      </button>
    </div>
  );
};

export default Fallback;
