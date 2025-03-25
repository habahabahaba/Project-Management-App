// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
import { use, useImperativeHandle, forwardRef, useRef } from "react";
import { createPortal } from "react-dom";
// Context:
// Hooks:
// Components:
// CSS:
// Types, interfaces and enumns:
import type { ForwardedRef } from "react";
interface NewProjectDialogProps {}
interface FormState {
  title: "please enter a project title" | "";
  description: "please enter a project description" | "";
  dueDate: "please enter a due date for a project" | "";
}
export type NewProjectDialogHandle = {
  showModal: () => void;
  focus: () => void;
};

const modalRootEl = document.getElementById("modal-root");
const NewProjectDialog = forwardRef<
  NewProjectDialogHandle,
  NewProjectDialogProps
>(({}: NewProjectDialogProps, ref: ForwardedRef<NewProjectDialogHandle>) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => ({
    showModal: () => {
      dialogRef.current?.showModal();
    },
    focus: () => {
      titleInputRef.current?.focus();
    },
  }));

  // Handlers:
  function handleCancel() {
    dialogRef.current?.close();
  }

  // JSX:
  return modalRootEl
    ? createPortal(
        <dialog
          ref={dialogRef}
          role='dialog'
          onClick={(ev) => {
            if (ev.target === dialogRef.current) {
              handleCancel();
            }
          }}
          className='absolute top-15 left-1/3 rounded-md p-4 shadow-md backdrop:bg-stone-900/90'
        >
          <div className='mt-4 mb-9 w-[35rem]'>
            <form ref={formRef}>
              <menu className='my-4 flex items-center justify-end gap-4'>
                <button
                  onClick={handleCancel}
                  className='text-stone-800 hover:text-stone-950'
                >
                  Cancel
                </button>
                <button className='rounded-md bg-stone-800 px-6 py-2 text-stone-50 hover:bg-stone-950'>
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
                  className='w-full rounded-sm border-b-2 border-stone-300 bg-stone-200 p-1 text-stone-600 focus:border-stone-600 focus:outline-none'
                />
              </label>
              <label
                htmlFor='project_description'
                className='text-sm font-bold text-stone-500 uppercase'
              >
                description
                <textarea
                  id='project_description'
                  name='project_description'
                  // type='text'
                  className='w-full rounded-sm border-b-2 border-stone-300 bg-stone-200 p-1 text-stone-600 focus:border-stone-600 focus:outline-none'
                />
              </label>
              <label
                htmlFor='project_due_date'
                className='text-sm font-bold text-stone-500 uppercase'
              >
                due date
                <input
                  id='project_due_date'
                  name='project_due_date'
                  type='date'
                  className='w-full rounded-sm border-b-2 border-stone-300 bg-stone-200 p-1 text-stone-600 focus:border-stone-600 focus:outline-none'
                />
              </label>
            </form>
          </div>
        </dialog>,
        modalRootEl,
      )
    : null;
});

export default NewProjectDialog;
