// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
import { use } from "react";
// Context:
import modalCloseCtx from "../context/modalCloseCtx";
// Hooks:
// Components:
// CSS:
// Types, interfaces and enumns:

export default function useCloseModal() {
  const context = use(modalCloseCtx);
  if (!context) {
    throw new Error("useModal must be used within a Modal component");
  }
  return context;
}
