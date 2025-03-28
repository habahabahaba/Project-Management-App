// React:
import { createContext } from "react";
// Types, interfaces and enumns:
import type { Dispatch, SetStateAction } from "react";
import type { ProjectsState } from "./projects.types";
import type { ProjectsAction } from "./projectsLocalReducer";
type projectsLocalCtxValue = {
  localState: ProjectsState;
  localDispatch: Dispatch<ProjectsAction>;
  selectedId: string | undefined;
  selectId: Dispatch<SetStateAction<string | undefined>>;
};

const initState: projectsLocalCtxValue = {
  localState: { projects: [], lastCreatedProjectId: undefined },
  localDispatch: () => {},
  selectedId: undefined,
  selectId: () => {},
};
const projectsLocalCtx = createContext<projectsLocalCtxValue>(initState);

export default projectsLocalCtx;
