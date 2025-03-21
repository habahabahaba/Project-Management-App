// React:
import { createContext } from "react";
// Types, interfaces and enumns:
import type { Dispatch, SetStateAction } from "react";
import type { Projects } from "./projects.types";
import type { ProjectsAction } from "./projectsLocalReducer";
type projectsLocalCtxValue = {
  localState: Projects;
  localDispatch: Dispatch<ProjectsAction>;
  selectedId: string | null;
  selectId: Dispatch<SetStateAction<string | null>>;
};

const initState: projectsLocalCtxValue = {
  localState: [],
  localDispatch: () => {},
  selectedId: null,
  selectId: () => {},
};
const projectsLocalCtx = createContext<projectsLocalCtxValue>(initState);

export default projectsLocalCtx;
