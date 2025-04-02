// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
import { use, useRef } from "react";
// Context:
import projectsLocalCtx from "../context/projectsLocalCtx";
// Hooks:
// Components:
// CSS:
// Types, interfaces and enumns:
import type { FC } from "react";
interface ExportImportFormProps {}

const ExportImportForm: FC<ExportImportFormProps> = () => {
  // Context:
  const { localState, localDispatch } = use(projectsLocalCtx);

  // Refs:
  const exportLinkRef = useRef<HTMLAnchorElement>(null);

  // Handlers:
  const today = new Date().toISOString().split("T")[0];
  // Function to prepare the download link
  function prepareExport(): void {
    if (!exportLinkRef || !exportLinkRef.current) return;

    const jsonBlob = new Blob([JSON.stringify(localState, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(jsonBlob);
    exportLinkRef.current.href = url;
    exportLinkRef.current.download = `My-projects-${today}.json`;
  }

  // JSX:
  return (
    <menu className='my-4 flex flex-col items-start justify-end gap-4'>
      <div className='mb-4 border-b-2 border-stone-300 pb-6'>
        <h2 className='my-4 text-xl font-bold text-stone-700'>Export</h2>
        <p className='mb-4 text-stone-400'>
          Click the link below to download your projects:
        </p>
        <a
          ref={exportLinkRef}
          onClick={prepareExport}
          className='cursor-pointer underline'
        >
          {`My-projects-${today}.json`}
        </a>
      </div>
      <div>
        <h2 className='my-4 text-xl font-bold text-stone-700'>Import</h2>
      </div>
    </menu>
  );
};

export default ExportImportForm;
