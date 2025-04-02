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
import ExportImportForm from "./ExportImportForm";
// CSS:
// Types, interfaces and enumns:
import type { ForwardedRef } from "react";
import type { ModalHandle } from "./Modal";

const ExportImportModal = forwardRef<ModalHandle>(
  (_, ref: ForwardedRef<ModalHandle>) => {
    // JSX:
    return (
      <Modal ref={ref}>
        <ExportImportForm />
      </Modal>
    );
  },
);

export default ExportImportModal;
