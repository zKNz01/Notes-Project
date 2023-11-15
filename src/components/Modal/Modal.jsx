import React from 'react';
import styles from './Modal.module.css';
import Tasks from '../Forms/Tasks';

const Modal = ({ isOpen, setModal }) => {
  function closeModal() {
    setModal(!isOpen);
  }

  if (isOpen) {
    return (
      <nav className={`${styles.nav} container`}>
        <div className={styles.div}>
          <button
            className={styles.button}
            onSubmit={closeModal}
            onClick={closeModal}
          >
            ↤
          </button>
          <Tasks closeModal={closeModal} />
        </div>
      </nav>
    );
  }
};

export default Modal;
