// React:
import { createContext } from "react";
// Types, interfaces and enumns:
type ModalCloseCtxValue = {
  handleCloseModal: () => void;
};

const modalCloseCtx = createContext<ModalCloseCtxValue>({
  handleCloseModal() {},
});

export default modalCloseCtx;
