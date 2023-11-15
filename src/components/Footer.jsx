import React from 'react';
import styles from './Footer.module.css';
import Modal from './Modal/Modal';

const Footer = () => {
  const [modal, setModal] = React.useState(false);

  return (
    <footer className={styles.footer}>
      <nav className={`${styles.nav} container`}>
        <button className={styles.buttonPlus} onClick={() => setModal(!modal)}>
          +
        </button>
        <Modal isOpen={modal} setModal={setModal} />
      </nav>
    </footer>
  );
};

export default Footer;
