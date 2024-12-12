import React from 'react';
import CryptoJS from 'crypto-js';

const PasswordHistory = ({ history, clearHistory }) => {
  const decryptPassword = (encryptedPassword) => {
    const secretKey = 'cat';
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  return (
    <div>
      <h2>История паролей:</h2>
      <ul>
        {history.length === 0 ? (
          <li>История пуста.</li>
        ) : (
          history.map((encryptedPassword, index) => (
            <li key={index}>{decryptPassword(encryptedPassword)}</li>
          ))
        )}
      </ul>
      <button onClick={clearHistory} style={{ marginTop: '10px' }}>
        Очистить историю
      </button>
    </div>
  );
};

export default PasswordHistory;
