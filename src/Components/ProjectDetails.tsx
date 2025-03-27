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
import ProjectSummary from "./ProjectSummary";
import ProjectTasks from "./ProjectTasks";
// CSS:
// Types, interfaces and enumns:
import type { FC } from "react";

const ProjectDetails: FC = () => {
  // Context:
  const {
    selectedId,
    localState: { projects },
  } = use(projectsLocalCtx);
  const selectedProject = projects.find(
    (project) => project.projectId === selectedId,
  );
  const { projectId, title, description, dueDate, tasks } = selectedProject || {
    projectId: "",
    title: "",
    description: "",
    dueDate: new Date(),
    tasks: [],
  };

  // Handlers:
  const { selectId, localDispatch } = use(projectsLocalCtx);

  function handleDeleteProject(): void {
    selectId(null);
    localDispatch({ type: "DELETE_PROJECT", payload: { projectId } });
  }

  // JSX:
  return (
    <div className='mt-16 w-[35rem]'>
      <ProjectSummary
        projectId={projectId}
        title={title}
        description={description}
        dueDate={dueDate}
        onDelete={handleDeleteProject}
      />
      <ProjectTasks projectId={projectId} tasks={tasks} />
    </div>
  );
};

export default ProjectDetails;
