// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
import { use, useRef, useEffect, useActionState } from "react";
// Context:
import projectsLocalCtx from "../context/projectsLocalCtx";
// Hooks:
import useModal from "../hooks/useModal";
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
  const { localDispatch } = use(projectsLocalCtx);
  const { handleCloseModal } = useModal();

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

  //   FORM LOGIC:
  //   For the task title input:
  async function createProject(
    prevState: FormState,
    formData: FormData | null,
  ): Promise<FormState> {
    // For the "Cancel" button (reset):
    if (formData === null) return initFormState;
    // VALIDATION:
    const errors: FormState["errors"] = {};
    function checkInput(inputId: string): false | string {
      if (!formData) return false;
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
    let dueDate: string | false | Date = checkInput("project_due_date");
    if (!dueDate) {
      errors.dueDate = "please enter a valid due date for the project";
    } else {
      dueDate = new Date(dueDate);
      if (isNaN(dueDate.getTime())) {
        errors.dueDate = "please enter a valid due date for the project";
      }
    }

    if (
      !errors.title &&
      !errors.description &&
      !errors.dueDate &&
      title &&
      description &&
      dueDate instanceof Date
    ) {
      // If all inputs are valid:
      // Add new project:
      localDispatch({
        type: "ADD_PROJECT",
        payload: { userId, title, description, dueDate },
      });
      //   Close modal:
      handleCloseModal();
      //   Reset form inputs:
      return initFormState;
    } else {
      // If there's an error:
      // Persist entered values and set errors in the formState:
      return {
        title: title || prevState.title,
        description: description || prevState.description,
        dueDate: prevState.dueDate,
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

  // JSX:
  return (
    <form action={formAction} key='reset'>
      <menu className='my-4 flex items-center justify-end gap-4'>
        <button
          onClick={() => {
            formAction(null);
          }}
          //   onClick={handleCloseModal}
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
          defaultValue={formState.dueDate}
          className='w-full rounded-sm border-b-2 border-stone-300 bg-stone-200 p-1 text-stone-600 focus:border-stone-600 focus:outline-none'
        />
      </label>
    </form>
  );
};

export default NewProjectForm;
