import React from 'react';
import styles from './LoginCreate.module.css';
import Input from '../Forms/Input';
import { validEmail } from '../utilities/regex';
import URL from '../utilities/url';
import { Navigate } from 'react-router-dom';

const LoginForm = () => {
  const [loadButton, setLoadButton] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [emailErr, setEmailErr] = React.useState('');
  const [senhaValueErr, setSenhaValueErr] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [senha2, setSenha2] = React.useState('');
  const [error, setError] = React.useState('');
  const [create, setCreate] = React.useState(false)

  function SubmitLogin(e) {
    setLoadButton(true);
    e.preventDefault();

    if (!email || !senha || !senha2) {
      setError('Preencha todos os Campos');
      setCreate(false)
      setLoadButton(false);
    }
    if (!validEmail.test(email)) {
      setEmailErr('Insira um Email válido');
      setCreate(false)
      setLoadButton(false);
    }
    if (senha !== senha2) {
      setSenhaValueErr(true);
      setCreate(false)
      setLoadButton(false);
    } else if (email && senha && validEmail && !senhaValueErr) {
      var raw = JSON.stringify({
        email: email,
        senha: senha,
        cnfsenha: senha2,
        admin: false,
      });

      var requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: raw,
        redirect: 'follow',
      };

      fetch(`${URL}/api/user/public`, requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json(), setCreate(true);
          } else if (!response.ok) {
            if (response.status === 400) {
              setError('Conta já existente. Por favor faça Login!');
              setLoadButton(false);
            }
          }
        })
        .then((result) => {
          setLoadButton(false);
          console.log(result);
        })
        .catch((error) => console.log('error', error));
    }
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.div}>
        <h1 className={styles.h1}>Cadastre-se!</h1>
        <form className={styles.divForm} onSubmit={SubmitLogin}>
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
              setEmailErr(false);
            }}
            className={styles.input}
            label="Email"
            type="text"
            name="email"
          />
          {emailErr && <p className={styles.error}>Insira um Email válido</p>}
          <Input
            onChange={(e) => {
              setSenha(e.target.value);
              setError('');
              setSenhaValueErr(false);
            }}
            className={styles.input}
            label="Senha"
            type="password"
            name="senha1"
          />
          <Input
            onChange={(e) => {
              setSenha2(e.target.value);
              setError('');
              setSenhaValueErr(false);
            }}
            className={styles.input}
            label="Confirmar Senha"
            type="password"
            name="senha2"
          />
          {senhaValueErr && <p className={styles.error}>Senhas diferentes</p>}
          {error && <p className={styles.error}>{error}</p>}
          {loadButton ? (
            <button
              disabled
              className={styles.buttonSave}
              onClick={SubmitLogin}
            >
              Criando...
            </button>
          ) : (
            <button className={styles.buttonSave} onClick={SubmitLogin}>
              Criar
            </button>
          )}
        </form>
      </div>
      {create && <Navigate to='/login' />}
    </nav>
  );
};

export default LoginForm;
