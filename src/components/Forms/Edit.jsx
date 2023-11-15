import React from 'react';
import styles from './Edit.module.css';
import useForm from '../../Hooks/useForm';
import Input from './Input';
import URL from '../url';

const Edit = ({ isOpen, setEdit, dados }) => {
  const [userImgs, setUserImgs] = React.useState();
  const title = useForm('title');
  const descricao = useForm('descricao');

  React.useEffect(() => {
    title.setValue(dados.title);
    descricao.setValue(dados.description);
  }, [dados]);

  function closeEdit() {
    setEdit(!isOpen);
  }

  function handleChange({ target }) {
    title.setValue(target.value);
  }

  function handleChangeD({ target }) {
    descricao.setValue(target.value);
  }

  function handleImgs({ target }) {
    const data = new FileReader();
    data.addEventListener('load', () => {
      setUserImgs(data.result);
    });
    data.readAsDataURL(target.files[0]);
  }

  async function handleDel(event) {
    const token = window.sessionStorage.getItem('token');
    event.preventDefault();

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

    await fetch(`${URL}/api/note/${dados._id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));

    setEdit(!isOpen);
    window.location.reload();
  }

  async function handleClickEdit(event) {
    const token = window.sessionStorage.getItem('token');
    event.preventDefault();

    var raw = JSON.stringify({
      _id: '',
      title: title.value,
      description: descricao.value,
      image: userImgs,
    });

    var requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: raw,
      cors: true,
    };

    await fetch(`${URL}/api/note/${dados._id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));

    window.location.reload();
  }

  if (isOpen) {
    return (
      <nav className={`${styles.nav} container`}>
        <div className={styles.div}>
          <form className={styles.form}>
            <div>
              <div>
                {userImgs ? <img src={userImgs} /> : <img src={dados.image} />}
              </div>
            </div>
            <Input
              className={styles.input}
              type="text"
              name="titulo"
              onChange={handleChange}
              value={title.value}
            />
            <Input
              className={styles.input}
              type="textarea"
              name="descricao"
              onChange={handleChangeD}
              value={descricao.value}
            />
            <button className={styles.buttonSave} onClick={handleClickEdit}>
              Salvar
            </button>
            <button className={styles.del} onClick={handleDel}></button>
          </form>
          <input type="file" onChange={handleImgs} />
        </div>
        <button className={styles.button} onClick={closeEdit}>
          ↤
        </button>
      </nav>
    );
  }
};

export default Edit;
