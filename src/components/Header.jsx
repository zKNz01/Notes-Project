import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const token = window.sessionStorage.getItem('token');
  const decode = jwtDecode(token);
  const isAdmin = decode.admin;

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.all} to="/">
          All
        </Link>
        <Link className={styles.reminder} to="/Reminder">
          Reminder
        </Link>
        <Link className={styles.important} to="/important">
          Important
        </Link>
        {isAdmin && (
          <Link className={styles.login} to="/Admin">
            Admin Painel
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
