// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
import { use, useRef, useEffect, useActionState } from "react";
// Context:
import projectsLocalCtx from "../context/projectsLocalCtx";
// Hooks:
import useCloseModal from "../hooks/useCloseModal";
// Components:
// CSS:
// Types, interfaces and enumns:
import type { FC } from "react";
interface FormState {
  title: string;
  description: string;
  dueDate: string;
  errors: {
    title?: "please enter the project title" | undefined;
    description?: "please enter the project description" | undefined;
    dueDate?: "please enter a valid due date for the project" | undefined;
  };
}
const initFormState: FormState = {
  title: "",
  description: "",
  dueDate: "",
  errors: {},
};

// DEV, user id:
const userId = "User_00";

const NewProjectForm: FC = () => {
  // Context:
  const {
    localDispatch,
    localState: { lastCreatedProjectId },
    selectId,
  } = use(projectsLocalCtx);
  const { handleCloseModal } = useCloseModal();

  // Refs:
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);
  const dueDateInputRef = useRef<HTMLInputElement>(null);

  // Autofocus first input on load:
  useEffect(() => {
    if (titleInputRef && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  // After NEW project is added, open the new project details and close the modal:
  useEffect(() => {
    if (lastCreatedProjectId) {
      selectId(lastCreatedProjectId);
      handleCloseModal();
    }

    console.log(
      "[NewProjectForm]: lastCreatedProjectId related useEffect fired with id of: ",
      lastCreatedProjectId,
    );
  }, [lastCreatedProjectId, selectId, handleCloseModal]);

  //   FORM LOGIC:
  //   Action:
  async function createProject(
    prevState: FormState,
    formData: FormData | "reset",
  ): Promise<FormState> {
    // For the "Cancel" button (reset form):
    if (formData === "reset") return initFormState;

    // VALIDATION:
    const errors: FormState["errors"] = {};
    // Helper function:
    function checkInput(inputId: string): false | string {
      if (formData === "reset") return false; // TS BS

      let string = formData.get(inputId);
      if (typeof string !== "string") {
        return false;
      }
      string = string.trim();
      if (!string) return false;

      return string;
    }

    // Title:
    const title = checkInput("project_title");
    if (!title) {
      errors.title = "please enter the project title";
    }
    // Description:
    const description = checkInput("project_description");
    if (!description) {
      errors.description = "please enter the project description";
    }
    // Due date:
    const dueDate: string | false | Date = checkInput("project_due_date");
    let dueDateObj;
    if (!dueDate) {
      errors.dueDate = "please enter a valid due date for the project";
    } else {
      dueDateObj = new Date(dueDate);
      if (isNaN(dueDateObj.getTime())) {
        errors.dueDate = "please enter a valid due date for the project";
      }
    }

    if (
      !errors.title &&
      !errors.description &&
      !errors.dueDate &&
      title &&
      description &&
      dueDateObj
    ) {
      // If all inputs are valid:
      // Add new project:
      localDispatch({
        type: "ADD_PROJECT",
        payload: { userId, title, description, dueDate: dueDateObj },
      });
      //   Close modal: is done in useEffect

      //   Reset form inputs:
      return initFormState;
    } else {
      // If there's an error:
      // Persist entered values and set errors in the formState:
      return {
        title: errors.title
          ? "" // for error message to be shown as a placeholder
          : title || prevState.title,
        description: errors.description
          ? "" // for error message to be shown as a placeholder
          : description || prevState.description,
        dueDate: errors.dueDate
          ? "" // for error message to be shown as a placeholder
          : dueDate || prevState.dueDate,
        errors, // new errors
      };
    }
  }

  const [formState, formAction, isPending] = useActionState(
    createProject,
    initFormState,
  );

  //   Focus FIRST INVALID input:
  useEffect(() => {
    if (formState.errors.title && titleInputRef && titleInputRef.current) {
      titleInputRef.current.focus();
    } else if (
      formState.errors.description &&
      descriptionTextareaRef &&
      descriptionTextareaRef.current
    ) {
      descriptionTextareaRef.current.focus();
    } else if (
      formState.errors.dueDate &&
      dueDateInputRef &&
      dueDateInputRef.current
    ) {
      dueDateInputRef.current.focus();
    }
  }, [formState]);

  //   For "min" attribute of the date-input:
  const today = new Date().toISOString().split("T")[0];

  //   Handlers:
  function handleCancel(): void {
    if (!formState.title && !formState.description && !formState.dueDate) {
      // If all inputs are EMPTY, close Modal:
      handleCloseModal();
    } else {
      // otherwise, reset inputs:
      formAction("reset");
    }
  }
  // JSX:
  return (
    <form action={formAction} key='reset'>
      <menu className='my-4 flex items-center justify-end gap-4'>
        <button
          onClick={handleCancel}
          type='reset'
          disabled={isPending}
          className='text-stone-800 hover:text-stone-950 disabled:text-stone-500'
        >
          Cancel
        </button>
        <button
          type='submit'
          disabled={isPending}
          className='rounded-md bg-stone-800 px-6 py-2 text-stone-50 hover:bg-stone-950 disabled:bg-stone-700 disabled:text-stone-300'
        >
          Save
        </button>
      </menu>

      <label
        htmlFor='project_title'
        className='text-sm font-bold text-stone-500 uppercase'
      >
        title
        <input
          ref={titleInputRef}
          id='project_title'
          name='project_title'
          type='text'
          defaultValue={formState.title}
          placeholder={formState.errors.title}
          className='w-full rounded-sm border-b-2 border-stone-300 bg-stone-200 p-1 text-stone-600 focus:border-stone-600 focus:outline-none'
        />
      </label>
      <label
        htmlFor='project_description'
        className='text-sm font-bold text-stone-500 uppercase'
      >
        description
        <textarea
          ref={descriptionTextareaRef}
          id='project_description'
          name='project_description'
          defaultValue={formState.description}
          placeholder={formState.errors.description}
          className='w-full rounded-sm border-b-2 border-stone-300 bg-stone-200 p-1 text-stone-600 focus:border-stone-600 focus:outline-none'
        />
      </label>
      <label
        htmlFor='project_due_date'
        className='text-sm font-bold text-stone-500 uppercase'
      >
        due date
        <input
          ref={dueDateInputRef}
          id='project_due_date'
          name='project_due_date'
          type='date'
          min={today}
          step={1}
          defaultValue={formState.dueDate}
          className='w-full rounded-sm border-b-2 border-stone-300 bg-stone-200 p-1 text-stone-600 focus:border-stone-600 focus:outline-none'
        />
      </label>
    </form>
  );
};

export default NewProjectForm;
