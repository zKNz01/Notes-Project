import React from 'react';
import styles from './Admin.module.css';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import URL from '../url';
import AdminCreate from './AdminCreate';

const Admin = () => {
  const token = sessionStorage.getItem('token');
  const decode = jwtDecode(token);
  const isOwner = decode.owner;
  const [admin, setAdmin] = React.useState(false);
  const [data, setData] = React.useState([]);

  if (!token) return <Navigate to="/login" />;

  if (isOwner) {
    React.useEffect(() => {
      const requestOptions = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        method: 'GET',
        cors: true,
      };

      fetch(`${URL}/api/user/admin`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setData(result);
          console.log(result);
        })
        .catch((error) => console.log('error', error));
    }, []);
  }

  function isOpen() {
    setAdmin(true);
  }

  return (
    <nav className={styles.div}>
      <div className={styles.infos}>
        <button className={styles.button} onClick={isOpen}>
          + Criar Novo
        </button>
      </div>
      {data ? (
        data.map((item) => (
          <nav className={styles.nav} key={item._id}>
            <ul>
              <li className={styles.li}>
                <div className={styles.contents}>
                  <h3>{item.email}</h3>
                  <p>{item._id}</p>
                </div>
                <div className={styles.contents2}></div>
              </li>
            </ul>
          </nav>
        ))
      ) : (
        <h3>Vazio por aqui...</h3>
      )}
      <AdminCreate isOpen={admin} setAdmin={setAdmin}></AdminCreate>
    </nav>
  );
};

export default Admin;
