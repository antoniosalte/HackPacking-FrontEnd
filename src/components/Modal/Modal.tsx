import "./scss/index.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";
import ReactSVG from "react-svg";

import { Button } from "..";
import closeImg from "../../images/modal-close.svg";

interface IModalProps {
  target?: HTMLElement | null;
  title: string;
  hide: () => void;
  cancelBtnText?: string;
  submitBtnText?: string;
  loading: boolean;
  formId?: string;
  show: boolean;
}
const modalRoot = document.getElementById("modal-root");

const Modal: React.FC<IModalProps> = ({
  cancelBtnText,
  children,
  hide,
  loading,
  formId = "modal-submit",
  submitBtnText,
  target = modalRoot,
  show,
  title,
}) =>
  target && show
    ? ReactDOM.createPortal(
        <div className="overlay overlay--modal" onClick={hide}>
          <div className="overlay__modal">
            <div className="modal" onClick={(e)=>{e.stopPropagation()}}>
              <div className="modal__content">{children}</div>
            </div>
          </div>
        </div>,
        target
      )
    : null;

export default Modal;
