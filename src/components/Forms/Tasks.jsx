import React, { useState } from 'react';
import Input from './Input';
import styles from './Tasks.module.css';
import URL from '../url';

const Tasks = (props) => {
  const token = window.sessionStorage.getItem('token');
  const [userImg, setUserImg] = React.useState();
  const [radio, setRadio] = React.useState('');
  const [loadButton, setLoadButton] = useState(null);
  const [titulo, setTitulo] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [error, setError] = React.useState('');

  async function SubmitCheck(event) {
    event.preventDefault();
    setLoadButton(true);

    if (!titulo || !radio) {
      setError('Preencha todos os Campos');
      setLoadButton(false);
    } else if (titulo || description) {
      var raw = JSON.stringify({
        title: titulo,
        description: description,
        image: userImg,
        option: radio,
      });

      var requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: raw,
        cors: true,
      };

      await fetch(`${URL}/api/note`, requestOptions)
        .then((response) => {
          if (response.ok) {
            return (
              response.json(), props.closeModal(), window.location.reload()
            );
          } else if (!response.ok) {
            if (response.status === 400) {
              setError('Nota já existente com o mesmo Título.');
              setLoadButton(false);
            }
          }
        })
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
    }
  }

  function HandleImg({ target }) {
    const data = new FileReader();
    data.addEventListener('load', () => {
      setUserImg(data.result);
    });
    data.readAsDataURL(target.files[0]);
  }

  return (
    <div className={styles.div}>
      <form className={styles.form} onSubmit={SubmitCheck}>
        <div>{userImg && <img src={userImg}></img>}</div>
        <input
          className={styles.files}
          name="file"
          type="file"
          onChange={HandleImg}
        />
        <Input
          onChange={(e) => {
            setTitulo(e.target.value);
            setError('');
          }}
          className={styles.input}
          placeholder="Título"
          type="text"
          name="titulo"
        />
        <Input
          onChange={(e) => {
            setDescription(e.target.value);
            setError('');
          }}
          className={styles.input}
          placeholder="Descrição"
          type="text"
          name="descricao"
        />

        <label className={styles.label}>
          <input
            value="Reminder"
            onChange={(e) => {
              setRadio(e.target.value);
              setError('');
            }}
            type="radio"
            name="option"
          />
          Reminder
        </label>
        <label className={styles.label}>
          <input
            value="Important"
            onChange={(e) => {
              setRadio(e.target.value);
              setError('');
            }}
            type="radio"
            name="option"
          />
          Important
        </label>
        {error && <p className={styles.error2}>{error}</p>}
        {loadButton ? (
          <button disabled className={styles.buttonSave}>
            Salvando...
          </button>
        ) : (
          <button className={styles.buttonSave} onClick={SubmitCheck}>
            Salvar
          </button>
        )}
      </form>
    </div>
  );
};

export default Tasks;
