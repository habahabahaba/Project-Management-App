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
import type { ModalHandle } from "./Modal";

const NewProjectModal = forwardRef<ModalHandle>(
  (_, ref: ForwardedRef<ModalHandle>) => {
    // JSX:
    return (
      <Modal ref={ref}>
        <NewProjectForm />
      </Modal>
    );
  },
);

export default NewProjectModal;
