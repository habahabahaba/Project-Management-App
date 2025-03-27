// React:
import { createContext } from "react";
// Types, interfaces and enumns:
import type { Dispatch, SetStateAction } from "react";
import type { ProjectsState } from "./projects.types";
import type { ProjectsAction } from "./projectsLocalReducer";
type projectsLocalCtxValue = {
  localState: ProjectsState;
  localDispatch: Dispatch<ProjectsAction>;
  selectedId: string | null;
  selectId: Dispatch<SetStateAction<string | null>>;
};

const initState: projectsLocalCtxValue = {
  localState: { projects: [], lastCreatedProjectId: null },
  localDispatch: () => {},
  selectedId: null,
  selectId: () => {},
};
const projectsLocalCtx = createContext<projectsLocalCtxValue>(initState);

export default projectsLocalCtx;
