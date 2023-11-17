import React from 'react';
import styles from './Conf.module.css';
import Input from '../Forms/Input';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import URL from '../utilities/url';

const Conf = ({ setConf, isOpen1, dados }) => {
  const token = window.sessionStorage.getItem('token');
  const decode = jwtDecode(token);
  const isOwner = decode.owner;
  const isAdmin = decode.admin;
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');

  if (!token) {
    return <Navigate to="/login" />;
  }

  async function handleDel(e) {
    e.preventDefault();

    var raw = '';

    var requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: raw,
      cors: true,
    };

    if (isOwner || isAdmin)
      await fetch(`${URL}/api/user/${dados._id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));

    setConf(!isOpen1);
    window.location.reload();
  }

  async function handleEdit(e) {
    e.preventDefault();

    var raw = JSON.stringify({
      email: email,
      senha: senha,
    });

    var requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: raw,
      redirect: 'follow',
      cors: true,
    };

    if (isOwner || isAdmin)
      await fetch(`${URL}/api/user/${dados._id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));

    setConf(false);
    window.location.reload();
  }

  function closeConf() {
    setConf(!isOpen1);
  }

  if (isOpen1)
    return (
      <nav className={`${styles.nav} container`}>
        <div className={styles.div}>
          <form className={styles.form} onSubmit={handleEdit}>
            <Input
              className={styles.input}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              label="Novo Email"
              type="text"
              name="email"
              placeholder={dados.email}
            />
            <Input
              className={styles.input}
              onChange={(e) => {
                setSenha(e.target.value);
              }}
              label="Nova Senha"
              type="password"
              name="senha"
            />
            <button className={styles.buttonSave} onClick={handleEdit}>
              Salvar
            </button>
            <button className={styles.del} onClick={handleDel}></button>
          </form>
        </div>
        <button className={styles.button} onClick={closeConf}>
          ↤
        </button>
      </nav>
    );
};

export default Conf;
