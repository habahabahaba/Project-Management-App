// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
import { use } from "react";
// Context:
import projectsLocalCtx from "../context/projectsLocalCtx";
// Hooks:
// Components:
import ProjectsListItem from "./ProjectsListItem";
// CSS:
// Types, interfaces and enumns:
import type { FC } from "react";

const ProjectsList: FC = () => {
  // Context:
  const projects = use(projectsLocalCtx).localState;
  // JSX:
  const list = projects.map(({ projectId, title }) => (
    <ProjectsListItem key={projectId} projectId={projectId} title={title} />
  ));

  return <ul className='mt-8'>{list}</ul>;
};

export default ProjectsList;
