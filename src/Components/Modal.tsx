// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
import { useImperativeHandle, forwardRef, useRef } from "react";
import { createPortal } from "react-dom";
// Context:
import modalCtx from "../context/modalCtx";
// Hooks:
// Components:
// CSS:
// Types, interfaces and enumns:
import type { ForwardedRef, ReactNode } from "react";
interface ModalProps {
  children: ReactNode;
}

export type ModalOpenHandle = {
  showModal: () => void;
};

const modalRootEl = document.getElementById("modal-root");
const Modal = forwardRef<ModalOpenHandle, ModalProps>(
  ({ children }: ModalProps, ref: ForwardedRef<ModalOpenHandle>) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    useImperativeHandle(ref, () => ({
      showModal: () => {
        dialogRef.current?.showModal();
      },
    }));

    // Handlers:
    function handleCloseModal() {
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
                handleCloseModal();
              }
            }}
            className='absolute top-18 left-1/3 rounded-md p-4 shadow-md backdrop:bg-stone-900/90'
          >
            <div className='mt-4 mb-9 w-[35rem]'>
              <modalCtx.Provider value={{ handleCloseModal }}>
                {children}
              </modalCtx.Provider>
            </div>
          </dialog>,
          modalRootEl,
        )
      : null;
  },
);

export default Modal;
