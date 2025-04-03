// Types, interfaces and enumns:
export interface Task {
  taskId: string;
  projectId: string;
  title: string;
  cleared: boolean;
}
export interface Project {
  projectId: string;
  userId: string;
  title: string;
  description: string;
  createdAt: number;
  dueDate: number;
  completed: boolean;
  tasks: Task[];
}
export type Projects = Project[];
export type ProjectsState = {
  lastCreatedProjectId: string | undefined;
  projects: Projects;
};

export function isValidProjectsState(data: unknown): data is ProjectsState {
  if (typeof data !== "object" || data === null) return false;

  const state = data as Partial<ProjectsState>;

  if (
    state.lastCreatedProjectId !== undefined &&
    typeof state.lastCreatedProjectId !== "string"
  ) {
    return false;
  }

  if (!Array.isArray(state.projects)) return false;

  for (const project of state.projects) {
    if (
      typeof project !== "object" ||
      project === null ||
      typeof project.projectId !== "string" ||
      typeof project.userId !== "string" ||
      typeof project.title !== "string" ||
      typeof project.description !== "string" ||
      typeof project.createdAt !== "number" || // Ensure timestamp
      typeof project.dueDate !== "number" ||
      typeof project.completed !== "boolean" ||
      !Array.isArray(project.tasks)
    ) {
      return false;
    }

    if (isNaN(project.createdAt) || project.createdAt <= 0) return false;

    for (const task of project.tasks) {
      if (
        typeof task !== "object" ||
        task === null ||
        typeof task.taskId !== "string" ||
        typeof task.projectId !== "string" ||
        typeof task.title !== "string" ||
        typeof task.cleared !== "boolean"
      ) {
        return false;
      }
    }
  }

  return true;
}
