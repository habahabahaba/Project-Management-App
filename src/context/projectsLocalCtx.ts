// React:
import { createContext } from 'react';
// Types, interfaces and enumns:
import type { Dispatch } from 'react';
import type { Projects } from './projects.types';
import type { ProjectsAction } from './projectsLocalReducer';
type projectsLocalCtxValue = {
  localState: Projects;
  localDispatch: Dispatch<ProjectsAction>;
} | null;

const projectsLocalCtx = createContext<projectsLocalCtxValue>(null);

export default projectsLocalCtx;
