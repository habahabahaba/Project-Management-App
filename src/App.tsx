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
import NewProjectDialog from "./Components/NewProjectDialog";
// CSS:
// Types, interfaces and enumns:
import type { NewProjectDialogHandle } from "./Components/NewProjectDialog";

function App() {
  // State:
  const newProjectDialogHandle = useRef<NewProjectDialogHandle>(null);
  // Context:
  const { selectedId, selectId } = use(projectsLocalCtx);
  // Handlers:
  function handleCreateNewProject() {
    selectId(null);
    newProjectDialogHandle?.current?.showModal();
    newProjectDialogHandle?.current?.focus();
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
      <NewProjectDialog ref={newProjectDialogHandle} />
    </main>
  );
}

export default App;
