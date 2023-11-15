import React from 'react';
import styles from './LoginCreate.module.css';
import Input from '../Forms/Input';
import { validEmail, validSenha } from '../regex';
import URL from '../url';

const LoginForm = () => {
  const [loadButton, setLoadButton] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [emailErr, setEmailErr] = React.useState(false);
  const [senhaErr, setSenhaErr] = React.useState(false);
  const [senhaValueErr, setSenhaValueErr] = React.useState(false);
  const [senha, setSenha] = React.useState('');
  const [senha2, setSenha2] = React.useState('');
  const [error, setError] = React.useState('');

  function SubmitLogin(event) {
    setLoadButton(true);
    event.preventDefault();

    if (!email || !senha || !senha2) {
      setError('Preencha todos os Campos');
      setLoadButton(false);
    }
    if (!validEmail.test(email)) {
      setEmailErr(true);
      setLoadButton(false);
    } else if (!validSenha.test(senha)) {
      setSenhaErr(true);
      setLoadButton(false);
    }
    if (senha !== senha2) {
      setSenhaValueErr(true);
      setLoadButton(false);
    } else if (email && senha && validEmail && validSenha) {
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
            return response.json();
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
        <h1 className={styles.h1}>Cadastro</h1>
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
          {emailErr && <p className={styles.error1}>Insira um Email válido</p>}
          <Input
            onChange={(e) => {
              setSenha(e.target.value);
              setError('');
              setSenhaErr(false);
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
              setSenhaErr(false);
              setSenhaValueErr(false);
            }}
            className={styles.input}
            label="Confirmar Senha"
            type="password"
            name="senha2"
          />
          {senhaErr && <p className={styles.error2}>Insira uma senha forte</p>}
          {senhaValueErr && <p>Senhas diferentes</p>}
          {error && <p className={styles.error3}>{error}</p>}
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
    </nav>
  );
};

export default LoginForm;
