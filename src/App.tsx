// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
import { use } from "react";
// Context:
import projectsLocalCtx from "./context/projectsLocalCtx";
// Hooks:
// Components:
import Sidebar from "./Components/Sidebar";
import ProjectDetails from "./Components/ProjectDetails";
// CSS:
// Types, interfaces and enumns:

function App() {
  // Context:
  const { selectedId } = use(projectsLocalCtx);
  // JSX:
  return (
    <main className='my-8 flex h-screen gap-8'>
      <Sidebar />
      {selectedId ? <ProjectDetails /> : null}
    </main>
  );
}

export default App;
