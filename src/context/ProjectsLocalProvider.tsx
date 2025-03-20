// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
import { useReducer, useState } from 'react';
// Reducer:
import projectsLocalReducer from './projectsLocalReducer';
// Context:
import projectsLocalCtx from './projectsLocalCtx';
// Hooks:
// Components:
// CSS:
// Types, interfaces and enumns:
import type { FC, ReactNode } from 'react';
interface ProjectsLocalProviderProps {
  children: ReactNode;
}

const ProjectsLocalProvider: FC<ProjectsLocalProviderProps> = ({
  children,
}) => {
  // For projects state:
  const [ProjectsLocalState, ProjectsLocalDispatch] = useReducer(
    projectsLocalReducer,
    []
  );

  // For selecting a project:
  const [selectedId, selectId] = useState<string | null>(null);

  const ctxValue = {
    localState: ProjectsLocalState,
    localDispatch: ProjectsLocalDispatch,
    selectedId,
    selectId,
  };

  // JSX:
  return (
    <projectsLocalCtx.Provider value={ctxValue}>
      {children}
    </projectsLocalCtx.Provider>
  );
};

export default ProjectsLocalProvider;
