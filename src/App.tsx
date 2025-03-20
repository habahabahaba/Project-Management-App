// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
// Context:
import ProjectsLocalProvider from './context/ProjectsLocalProvider';
// Hooks:
// Components:
import Sidebar from './Components/Sidebar';
// CSS:
// Types, interfaces and enumns:

function App() {
  return (
    <ProjectsLocalProvider>
      <main className='h-screen my-8 flex gap-8'>
        <Sidebar />
      </main>
    </ProjectsLocalProvider>
  );
}

export default App;
