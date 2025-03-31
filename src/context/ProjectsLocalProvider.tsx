// Utils:
import toLocalStorage from "../utils/toLocalStorage";
import fromLocalStorage from "../utils/fromLocalStorage";
// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
import { useReducer, useState, useEffect } from "react";
// Reducer:
import projectsLocalReducer from "./projectsLocalReducer";
// Context:
import projectsLocalCtx from "./projectsLocalCtx";
// Hooks:
// Components:
// CSS:
// Types, interfaces and enumns:
import type { FC, ReactNode } from "react";
import type { ProjectsState } from "./projects.types";
interface ProjectsLocalProviderProps {
  children: ReactNode;
}

// DEV ONLY DUMMY PROJECTS initial state:
import { ProjectModel } from "./projectsLocalReducer";
const initState: ProjectsState = {
  projects: [
    new ProjectModel({
      userId: "0",
      title: "Learning React",
      description: `Learn React from the ground up.
    
Start with the basics, finish with advanced knowledge.`,
      dueDate: new Date("2024-12-29").getTime(),
    }),
    new ProjectModel({
      userId: "0",
      title: "Master React",
      description: "Do master React.",
      dueDate: new Date("2025-11-01").getTime(),
    }),
  ],
  lastCreatedProjectId: undefined,
};

const localStorageKey = "PROJECTS_LOCAL_STATE"; // for syncing projects state.

const ProjectsLocalProvider: FC<ProjectsLocalProviderProps> = ({
  children,
}) => {
  // For projects state:
  const [ProjectsLocalState, ProjectsLocalDispatch] = useReducer(
    projectsLocalReducer,
    initState,
    () => fromLocalStorage<ProjectsState>(localStorageKey) || initState,
  );

  // For syncing Projects-State to local storage:
  useEffect(() => {
    toLocalStorage<ProjectsState>(localStorageKey, ProjectsLocalState);
  }, [ProjectsLocalState]);

  // For selecting a project:
  const [selectedId, selectId] = useState<string | undefined>(undefined);

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
