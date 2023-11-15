import React from 'react';
import styles from './Login.module.css';
import LoginForm from './LoginForm';
import LoginCreate from './LoginCreate';
import { Route, Routes } from 'react-router-dom';

const Login = () => {
  return (
    <nav className={styles.nav}>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="criar" element={<LoginCreate />} />
      </Routes>
    </nav>
  );
};

export default Login;
