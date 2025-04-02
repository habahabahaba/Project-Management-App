// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
import { use, useRef } from "react";
// Context:
import projectsLocalCtx from "./context/projectsLocalCtx";
// Hooks:
// Components:
import Sidebar from "./Components/Sidebar";
import ProjectDetails from "./Components/ProjectDetails";
import Fallback from "./Components/Fallback";
import NewProjectModal from "./Components/NewProjectModal";
import ExportImportModal from "./Components/ExportImportModal";
// CSS:
// Types, interfaces and enumns:
import type { ModalHandle } from "./Components/Modal";

function App() {
  // Refs:
  const newProjectDialogHandle = useRef<ModalHandle>(null);
  const ExportImportDialogHandle = useRef<ModalHandle>(null);
  // Context:
  const { selectedId, selectId } = use(projectsLocalCtx);
  // Handlers:
  function handleOpenNewProjectForm() {
    selectId(undefined);
    newProjectDialogHandle?.current?.handleShowModal();
  }
  function handleOpenExportImportForm() {
    selectId(undefined);
    ExportImportDialogHandle?.current?.handleShowModal();
  }
  // JSX:
  return (
    <main className='my-8 flex h-auto gap-8'>
      <Sidebar
        onCreateNewProject={handleOpenNewProjectForm}
        onExportImport={handleOpenExportImportForm}
      />
      {selectedId ? (
        <ProjectDetails />
      ) : (
        <Fallback onCreateNewProject={handleOpenNewProjectForm} />
      )}
      <NewProjectModal ref={newProjectDialogHandle} />
      <ExportImportModal ref={ExportImportDialogHandle} />
    </main>
  );
}

export default App;
