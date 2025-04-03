// 3rd party:
// Utils:
import generateId from "../utils/generateId";
// Types, interfaces and enumns:
import type { Task, Project, ProjectsState } from "./projects.types";
type AddProjectPayload = Pick<
  Project,
  "userId" | "title" | "description" | "dueDate"
>;
type AddTaskPayload = Pick<Task, "projectId" | "title">;
type ClearTaskPayload = Pick<Task, "projectId" | "taskId">;

export type ProjectsAction =
  | { type: "ADD_PROJECT"; payload: AddProjectPayload }
  | { type: "DELETE_PROJECT"; payload: { projectId: string } }
  | { type: "ADD_TASK"; payload: AddTaskPayload }
  | { type: "CLEAR_TASK"; payload: ClearTaskPayload }
  | { type: "REPLACE_ALL_PROJECTS"; payload: ProjectsState };

export class ProjectModel implements Project {
  constructor(addProjectPayload: AddProjectPayload) {
    const { userId, title, description, dueDate } = addProjectPayload;
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
  public dueDate: number;
  public completed: boolean;
  public tasks: Task[];
}

export class TaskModel implements Task {
  constructor(addTaskPayload: AddTaskPayload) {
    const { projectId, title } = addTaskPayload;
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

export default function projectsLocalReducer(
  state: ProjectsState,
  action: ProjectsAction,
): ProjectsState | never {
  switch (action.type) {
    case "ADD_PROJECT": {
      const newProject = new ProjectModel(action.payload);
      const lastCreatedProjectId = newProject.projectId;
      console.log(`[ADD_PROJECT]: ${JSON.stringify(newProject, null, 2)}`);

      return {
        projects: [newProject, ...state.projects],
        lastCreatedProjectId,
      };
    }
    case "DELETE_PROJECT": {
      console.log(`[DELETE_PROJECT]: ${action.payload.projectId}`);

      return {
        projects: state.projects.filter(
          (project) => project.projectId !== action.payload.projectId,
        ),
        lastCreatedProjectId: state.lastCreatedProjectId,
      };
    }
    case "ADD_TASK": {
      const newTask = new TaskModel(action.payload);

      console.log(`[ADD_TASK]: ${JSON.stringify(newTask, null, 2)}`);

      return {
        projects: state.projects.map((project) =>
          project.projectId === newTask.projectId
            ? { ...project, tasks: [...project.tasks, newTask] }
            : project,
        ),
        lastCreatedProjectId: state.lastCreatedProjectId,
      };
    }
    case "CLEAR_TASK": {
      console.log(
        `[DELETE_PROJECT] projectId: ${action.payload.projectId}, taskId: ${action.payload.taskId}`,
      );

      return {
        projects: state.projects.map((project) =>
          project.projectId === action.payload.projectId
            ? {
                ...project,
                tasks: project.tasks.filter(
                  ({ taskId }) => taskId !== action.payload.taskId,
                ),
              }
            : project,
        ),
        lastCreatedProjectId: state.lastCreatedProjectId,
      };
    }
    case "REPLACE_ALL_PROJECTS":
      return action.payload;
    default:
      throw new Error("[projectsReducer] encountered the UNKNOWN ACTION !!!");
  }
}
