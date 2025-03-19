// Types, interfaces and enumns:
export interface Task {
  id: string;
  title: string;
  cleared: boolean;
}
export interface Project {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  tasks: Task[];
}
export type Projects = Project[];
