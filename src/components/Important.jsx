import React from 'react';
import styles from './All.module.css';
import Edit from './Forms/Edit';
import URL from './utilities/url';

const All = () => {
  const token = window.sessionStorage.getItem('token');
  const [dados, setDados] = React.useState({});
  const [data, setData] = React.useState([]);
  const [edit, setEdit] = React.useState(false);

  React.useEffect(() => {
    var requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      method: 'GET',
      cors: true,
    };

    fetch(`${URL}/api/note?option=Important`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      })
      .catch((error) => console.log('error', error));
  }, []);

  function isOpen(item) {
    setDados(item);
    setEdit(true);
  }

  return (
    <>
      <h3 className={styles.h3}>Upcoming</h3>
      {data ? (
        data.map((item) => (
          <nav className={styles.nav} key={item._id}>
            <ul>
              <li className={styles.li}>
                <div className={styles.contents}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className={styles.contents2}>
                  <button
                    onClick={() => isOpen(item)}
                    className={styles.editar}
                  >
                    i
                  </button>
                </div>
              </li>
            </ul>
          </nav>
        ))
      ) : (
        <h3>Vazio por aqui...</h3>
      )}
      <Edit dados={dados} isOpen={edit} setEdit={setEdit} />
      <h3 className={styles.h3}>Done</h3>
    </>
  );
};

export default All;
