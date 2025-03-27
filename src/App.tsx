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
// CSS:
// Types, interfaces and enumns:
import type { ModalHandle } from "./Components/Modal";

function App() {
  // State:
  const DialogHandle = useRef<ModalHandle>(null);
  // Context:
  const { selectedId, selectId } = use(projectsLocalCtx);
  // Handlers:
  function handleCreateNewProject() {
    selectId(null);
    DialogHandle?.current?.handleShowModal();
  }
  // JSX:
  return (
    <main className='my-8 flex h-screen gap-8'>
      <Sidebar onCreateNewProject={handleCreateNewProject} />
      {selectedId ? (
        <ProjectDetails />
      ) : (
        <Fallback onCreateNewProject={handleCreateNewProject} />
      )}
      <NewProjectModal ref={DialogHandle} />
    </main>
  );
}

export default App;
