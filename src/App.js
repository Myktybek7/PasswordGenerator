import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import PasswordSettings from './PasswordSettings';
import PasswordHistory from './PasswordHistory';
import PasswordDisplay from './PasswordDisplay';
import './App.css';

const assessPasswordStrength = (password) => { 
  let score = 0; 
  if (password.length >= 8) score += 1; 
  if (/[A-Z]/.test(password)) score += 1; 
  if (/[a-z]/.test(password)) score += 1; 
  if (/[0-9]/.test(password)) score += 1; 
  if (/[@#$%^&+=!,.?]/.test(password)) score += 1; 

  if (score === 5) return 'Очень надежный'; 
  if (score === 4) return 'Надежный'; 
  if (score === 3) return 'Удовлетворительный'; 
  return 'Слабый'; 
};

const App = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(22);
  const [error, setError] = useState('');
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem('passwordHistory')) || []
  );

  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [noSimilarChars, setNoSimilarChars] = useState(true);
  const [noDuplicateChars, setNoDuplicateChars] = useState(true);
  const [noSequentialChars, setNoSequentialChars] = useState(true);
  const [autoGenerate, setAutoGenerate] = useState(false);

  useEffect(() => {
    const savedPreferences = JSON.parse(localStorage.getItem('userPreferences'));
    if (savedPreferences) {
      setIncludeNumbers(savedPreferences.includeNumbers);
      setIncludeLowercase(savedPreferences.includeLowercase);
      setIncludeUppercase(savedPreferences.includeUppercase);
      setIncludeSymbols(savedPreferences.includeSymbols);
      setNoSimilarChars(savedPreferences.noSimilarChars);
      setNoDuplicateChars(savedPreferences.noDuplicateChars);
      setNoSequentialChars(savedPreferences.noSequentialChars);
      setAutoGenerate(savedPreferences.autoGenerate);
    }
  }, []);

  useEffect(() => {
    const userPreferences = {
      includeNumbers,
      includeLowercase,
      includeUppercase,
      includeSymbols,
      noSimilarChars,
      noDuplicateChars,
      noSequentialChars,
      autoGenerate,
    };
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
  }, [includeNumbers, includeLowercase, includeUppercase, includeSymbols, noSimilarChars, noDuplicateChars, noSequentialChars, autoGenerate]);

  const generatePassword = () => {
    setError('');
    if (length < 6 || length > 32) {
      setError('Длина пароля должна быть от 6 до 32 символов.');
      return;
    }

    const chars = buildCharSet();
    if (!chars.length) {
      setError('Вы должны выбрать хотя бы один тип символа для пароля!');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars[randomIndex];
    }

    setPassword(newPassword);
    addToHistory(newPassword); 
  };

  const buildCharSet = () => {
    let charSet = '';
    if (includeNumbers) charSet += '0123456789';
    if (includeLowercase) charSet += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeSymbols) charSet += '@#$%^&+=!,.?';
    return charSet;
  };

  const addToHistory = (newPassword) => {
    const encryptedPassword = encryptPassword(newPassword);
    const newHistory = [...history, encryptedPassword]; 
    setHistory(newHistory); 
    localStorage.setItem('passwordHistory', JSON.stringify(newHistory)); 
  };

  const encryptPassword = (password) => {
    const secretKey = 'cat';
    return CryptoJS.AES.encrypt(password, secretKey).toString();
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('passwordHistory');
  };

  const passwordStrength = assessPasswordStrength(password);

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password)
        .then(() => {
          alert('Пароль скопирован в буфер обмена!');
        })
        .catch((err) => {
          console.error('Ошибка при копировании пароля: ', err);
        });
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h1>Генератор паролей</h1>
      <PasswordSettings
        length={length}
        setLength={setLength}
        includeNumbers={includeNumbers}
        setIncludeNumbers={setIncludeNumbers}
        includeLowercase={includeLowercase}
        setIncludeLowercase={setIncludeLowercase}
        includeUppercase={includeUppercase}
        setIncludeUppercase={setIncludeUppercase}
        includeSymbols={includeSymbols}
        setIncludeSymbols={setIncludeSymbols}
        noSimilarChars={noSimilarChars}
        setNoSimilarChars={setNoSimilarChars}
        noDuplicateChars={noDuplicateChars}
        setNoDuplicateChars={setNoDuplicateChars}
        noSequentialChars={noSequentialChars}
        setNoSequentialChars={setNoSequentialChars}
        autoGenerate={autoGenerate}
        setAutoGenerate={setAutoGenerate}
        generatePassword={generatePassword}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <PasswordDisplay password={password} />
      {password && (
        <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
          <p>Сила пароля: {passwordStrength}</p>
          <button onClick={copyToClipboard}>Копировать в буфер обмена</button>
        </div>
      )}
      <PasswordHistory history={history} clearHistory={clearHistory} />
    </div>
  );
};

export default App;
