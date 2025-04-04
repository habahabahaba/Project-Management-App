// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
import { use, useRef, useActionState, useEffect, startTransition } from "react";
// Context:
import projectsLocalCtx from "../context/projectsLocalCtx";
// Hooks:
import useCloseModal from "../hooks/useCloseModal";
// Components:
// CSS:
// Types, interfaces and enumns:
import type { FC } from "react";
import { isValidProjectsState } from "../context/projects.types";
interface FormState {
  errors:
    | "please select a valid .json file"
    | "couldn't load the file"
    | "there was an error, reading this file"
    | undefined;
}
const initFormState: FormState = {
  errors: undefined,
};

const ImportForm: FC = () => {
  // Context:
  const { localState, localDispatch } = use(projectsLocalCtx);
  const { handleCloseModal } = useCloseModal();

  // Refs:
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Autofocus first input on load:
  useEffect(() => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.focus();
    }
  }, []);

  // After projects are imported, close the modal:
  useEffect(handleCloseModal, [localState, handleCloseModal]);

  // Form logic:
  async function loadProjects(
    prevState: FormState,
    formData: FormData | "reset",
  ): Promise<FormState> {
    if (formData === "reset") return initFormState;

    const file = formData.get("projects_file") as File | null;
    console.log(`[loadProjects] file: ${JSON.stringify(file, null, 2)}`);
    if (!file || !(file instanceof File) || file.size === 0) {
      console.log(`[loadProjects]: NO FILE`);
      return {
        errors: "please select a valid .json file",
      };
    }

    try {
      const fileText = await file.text();
      const jsonData = JSON.parse(fileText);

      console.log(
        `[loadProjects]: jsonData: ${JSON.stringify(jsonData, null, 2)}`,
      );

      if (isValidProjectsState(jsonData)) {
        console.log(`[loadProjects]: valid projects state`);

        localDispatch({ type: "REPLACE_ALL_PROJECTS", payload: jsonData });
        return initFormState; // Reset form on success
      } else {
        console.log(`[loadProjects]: NOT a valid projects state`);
        return {
          errors: "there was an error, reading this file",
        };
      }
    } catch (error) {
      if (error instanceof Error) console.error(error);

      return {
        errors: "there was an error, reading this file",
      };
    }
  }

  const [formState, formAction, isPending] = useActionState(
    loadProjects,
    initFormState,
  );

  //   Handlers:
  function handleCancel(): void {
    if (!fileInputRef || !fileInputRef.current) return;
    if (fileInputRef.current.files?.length || formState.errors) {
      console.log(
        `[ImportForm][handleCancel] fileInputRef.current.files: ${fileInputRef?.current?.files}`,
      );
      // If a file is selected or there's an error message:
      // Unselect the file;
      fileInputRef.current.value = "";
      // Remove the error message:
      startTransition(() => {
        formAction("reset");
      });
    } else {
      // If input is EMPTY and there's no error messages, close Modal:
      handleCloseModal();
    }
  }

  // JSX:
  return (
    <form action={formAction} key='reset'>
      <menu className='my-4 flex items-center justify-end gap-4'>
        <h2 className='w-full text-xl font-bold text-stone-700'>Import:</h2>
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
          {isPending ? "Loading" : "Import"}
        </button>
      </menu>
      <label
        htmlFor='projects_file'
        className='text-sm font-bold text-stone-500 uppercase'
      >
        select file (
        <span className='text-red-600'>
          this will replace your current projects
        </span>
        )
        <input
          ref={fileInputRef}
          id='projects_file'
          name='projects_file'
          type='file'
          className='my-2 w-full rounded-sm border-b-2 border-stone-300 bg-stone-200 p-1 text-stone-600 focus:border-stone-600 focus:outline-none'
        />
        <p className='min-h-5 text-red-600'>{formState.errors || ""}</p>
      </label>
    </form>
  );
};

export default ImportForm;
