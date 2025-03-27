// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
import { use } from "react";
// Context:
import modalCtx from "../context/modalCtx";
// Hooks:
// Components:
// CSS:
// Types, interfaces and enumns:

export default function useModal() {
  const context = use(modalCtx);
  if (!context) {
    throw new Error("useModal must be used within a Modal component");
  }
  return context;
}
