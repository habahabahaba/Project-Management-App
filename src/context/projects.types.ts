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
  createdAt: Date;
  dueDate: Date;
  completed: boolean;
  tasks: Task[];
}
export type Projects = Project[];
export type ProjectsState = {
  lastCreatedProjectId: string | undefined;
  projects: Projects;
};
