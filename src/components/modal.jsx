import React from "react";

const Modal = ({ open }) => {
  return (
    <dialog open={open} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Youe Loser, Fucking idiot!</h3>
        <p className="py-4">
          Click the Restart button below to close you douchbag!
        </p>
        <div className="modal-action"></div>
      </div>
    </dialog>
  );
};

export default Modal;
