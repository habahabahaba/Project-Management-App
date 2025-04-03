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

const ExportLink: FC = () => {
  // Context:
  const { localState } = use(projectsLocalCtx);

  // Refs:
  const exportLinkRef = useRef<HTMLAnchorElement>(null);

  const today = new Date().toISOString().split("T")[0];
  const exportFilename = `My-projects-${today}.json`;

  // Handlers:
  // Function to prepare the download link
  function prepareExport(): void {
    if (!exportLinkRef || !exportLinkRef.current) return;

    const jsonBlob = new Blob([JSON.stringify(localState, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(jsonBlob);
    exportLinkRef.current.href = url;
    exportLinkRef.current.download = exportFilename;
  }

  // JSX:
  return (
    <div className='mt-9 border-t-2 border-stone-300 pt-3'>
      <h2 className='my-4 text-xl font-bold text-stone-700'>Export:</h2>
      <p className='mb-4 text-sm font-bold text-stone-500 uppercase'>
        Click the link below to download your projects
      </p>
      <a
        ref={exportLinkRef}
        onClick={prepareExport}
        className='cursor-pointer underline'
      >
        {exportFilename}
      </a>
    </div>
  );
};

export default ExportLink;
