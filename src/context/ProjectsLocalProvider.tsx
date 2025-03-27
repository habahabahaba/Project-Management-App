// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
import { useReducer, useState } from "react";
// Reducer:
import projectsLocalReducer from "./projectsLocalReducer";
// Context:
import projectsLocalCtx from "./projectsLocalCtx";
// Hooks:
// Components:
// CSS:
// Types, interfaces and enumns:
import type { FC, ReactNode } from "react";
interface ProjectsLocalProviderProps {
  children: ReactNode;
}

// DEV ONLY DUMMY PROJECTS initial state:
import type { ProjectsState } from "./projects.types";
import { ProjectModel } from "./projectsLocalReducer";
const initState: ProjectsState = {
  projects: [
    new ProjectModel({
      userId: "0",
      title: "Learning React",
      description: `Learn React from the ground up.
    
Start with the basics, finish with advanced knowledge.`,
      dueDate: new Date("2024-12-29"),
    }),
    new ProjectModel({
      userId: "0",
      title: "Master React",
      description: "Do master React.",
      dueDate: new Date("2025-11-01"),
    }),
  ],
  lastCreatedProjectId: null,
};

const ProjectsLocalProvider: FC<ProjectsLocalProviderProps> = ({
  children,
}) => {
  // For projects state:
  const [ProjectsLocalState, ProjectsLocalDispatch] = useReducer(
    projectsLocalReducer,
    initState,
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
