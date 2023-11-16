import React from 'react';
import styles from './AdminCreate.module.css';
import Input from '../Forms/Input';
import { validEmail, validSenha } from '../utilities/regex';
import { jwtDecode } from 'jwt-decode';
import URL from '../utilities/url';

const AdminCreate = ({ isOpen, setAdmin }) => {
  const [loadButton, setLoadButton] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [emailErr, setEmailErr] = React.useState(false);
  const [senhaErr, setSenhaErr] = React.useState(false);
  const [senhaValueErr, setSenhaValueErr] = React.useState(false);
  const [senha, setSenha] = React.useState('');
  const [senha2, setSenha2] = React.useState('');
  const [error, setError] = React.useState('');
  const token = window.sessionStorage.getItem('token');
  const decode = jwtDecode(token);
  const isOwner = decode.owner;

  function CloseAdminCreate() {
    setAdmin(!isOpen);
  }

  function handleAdmin(event) {
    setLoadButton(true);
    event.preventDefault();
    if (isOwner) {
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
          admin: true,
        });

        var requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: raw,
          redirect: 'follow',
        };

        fetch(`${URL}/api/user/admin`, requestOptions)
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
    } else {
      <p>error</p>;
    }
  }

  if (isOpen)
    return (
      <nav className={styles.nav}>
        <div className={styles.div}></div>
        <form className={styles.form}>
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
          <Input
            onChange={(e) => {
              setSenha(e.target.value);
              setError('');
              setSenhaErr(false);
              setSenhaValueErr(false);
            }}
            label="Senha"
            className={styles.input}
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
            label="Confirmar Senha"
            className={styles.input}
            type="password"
            name="senha2"
          />
          {loadButton ? (
            <button
              disabled
              className={styles.buttonSave}
              onClick={handleAdmin}
            >
              Salvando..
            </button>
          ) : (
            <button className={styles.buttonSave} onClick={handleAdmin}>
              Salvar
            </button>
          )}
        </form>
        {emailErr && <p>email error</p>}
        {senhaErr && <p>senha error</p>}
        {senhaValueErr && <p>senhas diferentes</p>}
        {error && <p>error</p>}
        <button className={styles.button} onClick={CloseAdminCreate}>
          Fechar
        </button>
      </nav>
    );
};

export default AdminCreate;
