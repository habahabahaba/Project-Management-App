// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
import { useReducer } from 'react';
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
  const [ProjectsLocalState, ProjectsLocalDispatch] = useReducer(
    projectsLocalReducer,
    []
  );

  const ctxValue = {
    state: ProjectsLocalState,
    dispatch: ProjectsLocalDispatch,
  };

  // JSX:
  return (
    <projectsLocalCtx.Provider value={ctxValue}>
      {children}
    </projectsLocalCtx.Provider>
  );
};

export default ProjectsLocalProvider;
