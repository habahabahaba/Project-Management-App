// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
import { forwardRef } from "react";
// Context:
// Hooks:
// Components:
import Modal from "./Modal";
import NewProjectForm from "./NewProjectForm";
// CSS:
// Types, interfaces and enumns:
import type { ForwardedRef } from "react";
import type { ModalOpenHandle } from "./Modal";

export type NewProjectModalOpenHandle = {
  showModal: () => void;
  focus: () => void;
};

const NewProjectModal = forwardRef<ModalOpenHandle>(
  (_, ref: ForwardedRef<ModalOpenHandle>) => {
    // JSX:
    return (
      <Modal ref={ref}>
        <NewProjectForm />
      </Modal>
    );
  },
);

export default NewProjectModal;
