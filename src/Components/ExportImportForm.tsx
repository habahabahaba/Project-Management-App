// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
import { use, useRef } from "react";
// Context:
import projectsLocalCtx from "../context/projectsLocalCtx";
// Hooks:
import useCloseModal from "../hooks/useCloseModal";
// Components:
// CSS:
// Types, interfaces and enumns:
import type { FC } from "react";
interface ExportImportFormProps {}

const ExportImportForm: FC<ExportImportFormProps> = () => {
  // Context:
  const { localState, localDispatch } = use(projectsLocalCtx);
  const { handleCloseModal } = useCloseModal();

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
    <div className='flex flex-col items-start justify-end gap-4'>
      <menu className='flex items-center justify-end gap-4 self-end'>
        <button
          onClick={handleCloseModal}
          type='reset'
          //   disabled={isPending}
          className='text-stone-800 hover:text-stone-950 disabled:text-stone-500'
        >
          Cancel
        </button>
      </menu>
      <div className='mb-4 border-b-2 border-stone-300 pb-6'>
        <h2 className='my-2 text-xl font-bold text-stone-700'>Export</h2>
        <p className='mb-4 text-stone-400'>
          Click the link below to download your projects:
        </p>
        <a
          ref={exportLinkRef}
          onClick={prepareExport}
          className='cursor-pointer underline'
        >
          {exportFilename}
        </a>
      </div>
      <div>
        <h2 className='my-2 text-xl font-bold text-stone-700'>Import</h2>
      </div>
    </div>
  );
};

export default ExportImportForm;
