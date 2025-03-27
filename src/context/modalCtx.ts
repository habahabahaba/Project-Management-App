// React:
import { createContext } from "react";
// Types, interfaces and enumns:
type ModalCtxValue = {
  handleCloseModal: () => void;
};

const modalCtx = createContext<ModalCtxValue>({
  handleCloseModal() {},
});

export default modalCtx;
