/* 
### Problem 10: Modal Popup

**Description:**

- Create a button that opens a modal popup when clicked.
- The modal should have a close button to hide it.
- Ensure that clicking outside the modal or pressing the "Escape" key also closes the modal.

 */
import React, { useState } from "react";
import { Modal } from "./Modal";

const ModalPopup = () => {
  const [isModalOpen, setIsModalOpen] = useState();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const modalContent = (
    <>
      <h2>Modal Popup</h2>
      <p>This is a modal popup. Click outside or press "Escape" to close it.</p>
    </>
  );

  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque aperiam
        laboriosam explicabo debitis voluptas reiciendis ullam ratione magnam,
        obcaecati vitae natus numquam sapiente tempora assumenda magni
        repellendus expedita nulla a!
      </p>
      <button onClick={toggleModal}>open Modal</button>
      {isModalOpen && <Modal onClose={toggleModal} content={modalContent} />}
    </div>
  );
};

export default ModalPopup;
