// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
import { useReducer } from 'react';
// Context:
// Hooks:
// Components:
// CSS:
// Types, interfaces and enumns:
import type { Task, Project, Projects } from './projects.types';
type AddProjectPayload = Pick<Project, 'title' | 'description' | 'dueDate'>;
type AddTaskPayload = Pick<Task, 'projectId' | 'title'>;
type ClearTaskPayload = Pick<Task, 'projectId' | 'taskId'>;

type ProjectsAction =
  | { type: 'ADD_PROJECT'; payload: AddProjectPayload }
  | { type: 'DELETE_PROJECT'; payload: { projectId: string } }
  | { type: 'ADD_TASK'; payload: AddTaskPayload }
  | { type: 'CLEAR_TASK'; payload: ClearTaskPayload };

class ProjectModel implements Project {
  constructor(constructorArgObj: AddProjectPayload) {
    const { title, description, dueDate } = constructorArgObj;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
  }
  readonly projectId: string;
  readonly userId: string;
  readonly createdAt: Date;
  public title: string;
  public description: string;
  public dueDate: Date;
  public completed: boolean;
  public tasks: Task[];
}

export default function projectsReducer(
  state: Projects,
  action: ProjectsAction
): Projects | never {
  switch (action.type) {
    // case 'ADD_PROJECT':
    //   const newProject: Project = {};
    case 'DELETE_PROJECT':
      return state.filter(
        (project) => project.projectId !== action.payload.projectId
      );
    default:
      throw new Error('projectsReducer encountered unknown action!');
  }
}
