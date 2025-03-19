// 3rd party:
// Utils:
import generateId from '../utils/generateId';
// Redux RTK:
// Store:
// React Router:
// React:
// Context:
// Hooks:
// Components:
// CSS:
// Types, interfaces and enumns:
import type { Task, Project, Projects } from './projects.types';
type AddProjectPayload = Pick<
  Project,
  'userId' | 'title' | 'description' | 'dueDate'
>;
type AddTaskPayload = Pick<Task, 'projectId' | 'title'>;
type ClearTaskPayload = Pick<Task, 'projectId' | 'taskId'>;

type ProjectsAction =
  | { type: 'ADD_PROJECT'; payload: AddProjectPayload }
  | { type: 'DELETE_PROJECT'; payload: { projectId: string } }
  | { type: 'ADD_TASK'; payload: AddTaskPayload }
  | { type: 'CLEAR_TASK'; payload: ClearTaskPayload };

class ProjectModel implements Project {
  constructor(constructorArgObj: AddProjectPayload) {
    const { userId, title, description, dueDate } = constructorArgObj;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;

    this.projectId = generateId();
    this.createdAt = new Date();
    this.completed = false;
    this.tasks = [];
  }

  readonly userId: string;
  readonly projectId: string;
  readonly createdAt: Date;
  public title: string;
  public description: string;
  public dueDate: Date;
  public completed: boolean;
  public tasks: Task[];
}

class TaskModel implements Task {
  constructor(constructorArgObj: AddTaskPayload) {
    const { projectId, title } = constructorArgObj;
    this.projectId = projectId;
    this.title = title;

    this.taskId = generateId();
    this.cleared = false;
  }

  readonly projectId: string;
  readonly taskId: string;
  public title: string;
  public cleared: boolean;
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
