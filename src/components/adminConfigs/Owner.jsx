import React from 'react';

const Owner = ({ setOwner, isOpen2 }) => {
  function closeOwner() {
    setOwner(!isOpen2);
  }

  return (
    <div>
      <button onClick={closeOwner}>Fechar</button>
    </div>
  );
};

export default Owner;
