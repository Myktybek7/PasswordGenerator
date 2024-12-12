import React from 'react';

const PasswordDisplay = ({ password }) => {
  return (
    <div>
      {password && (
        <>
          <h2>Ваш сгенерированный пароль:</h2>
          <p>{password}</p>
        </>
      )}
    </div>
  );
};

export default PasswordDisplay;
