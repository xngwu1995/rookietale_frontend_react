import React, { useState } from "react";
import "./index.css";

const DescriptionPopup = ({ description, title, text }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <div>
      <button onClick={openModal} className="button">
        {description}
      </button>

      {isOpen && (
        <div className="modalOverlay">
          <div className="modal">
            <button onClick={closeModal} className="closeButton">
              X
            </button>
            <h1 className="title">{title}</h1>
            <p className="text">{text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionPopup;
