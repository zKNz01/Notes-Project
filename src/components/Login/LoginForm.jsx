import React from 'react';
import styles from './LoginForm.module.css';
import { Link, Navigate } from 'react-router-dom';
import Input from '../Forms/Input';
import URL from '../utilities/url';

const LoginForm = () => {
  const [auth, setAuth] = React.useState(null);
  const [loadButton, setLoadButton] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [error, setError] = React.useState('');

  async function handleLogin(event) {
    setLoadButton(true);
    event.preventDefault();

    if (!email || !senha) {
      setError('Preencha todos os Campos');
      setAuth(false);
      setLoadButton(false);
    } else if (email || senha) {
      var raw = JSON.stringify({
        email: email,
        senha: senha,
        cnfenha: senha,
      });

      var requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: raw,
        redirect: 'follow',
      };
      await fetch(`${URL}/api/authenticate`, requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (!response.ok) {
            if (response.status === 400) {
              setError('Email ou Senha inválido');
              setAuth(false);
              setLoadButton(false);
            }
          }
        })
        .then((result) => {
          window.sessionStorage.setItem('token', result.token);
          setAuth(true);
          setLoadButton(false);
          console.log(result);
        })
        .catch((error) => console.log('error', error));
    }
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.div}>
        <h1 className={styles.h1}>Entrar</h1>
        <form className={styles.divForm} onSubmit={handleLogin}>
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            className={styles.input}
            label="Email"
            type="text"
            name="email"
          />
          <Input
            onChange={(e) => {
              setSenha(e.target.value);
              setError('');
            }}
            label="Senha"
            className={styles.input}
            type="password"
            name="senha"
          />
          {error && <p className={styles.error}>{error}</p>}
          {loadButton ? (
            <button
              disabled
              onClick={handleLogin}
              className={styles.buttonSave}
            >
              Entrando..
            </button>
          ) : (
            <button onClick={handleLogin} className={styles.buttonSave}>
              Entrar
            </button>
          )}
        </form>
        <div className={styles.divLink}>
          <p>Não tem conta ainda?</p>
          <Link className={styles.link} to="/login/Criar">
            Crie uma!
          </Link>
        </div>
        {auth && <Navigate to="/" />}
      </div>
    </nav>
  );
};

export default LoginForm;
