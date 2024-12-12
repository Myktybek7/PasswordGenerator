import React from 'react';

const PasswordSettings = ({
  length,
  setLength,
  includeNumbers,
  setIncludeNumbers,
  includeLowercase,
  setIncludeLowercase,
  includeUppercase,
  setIncludeUppercase,
  includeSymbols,
  setIncludeSymbols,
  noSimilarChars,
  setNoSimilarChars,
  noDuplicateChars,
  setNoDuplicateChars,
  noSequentialChars,
  setNoSequentialChars,
  autoGenerate,
  setAutoGenerate,
  generatePassword,
}) => {
  return (
    <div>
      <label>
        Длина пароля:
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          min="6"
          max="32"
        />
      </label>
      <h2>Выберите параметры пароля:</h2>
      <div>
        <label>
          Включать числа:
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
        </label>
      </div>
      <div>
        <label>
          Включать строчные буквы:
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
        </label>
      </div>
      <div>
        <label>
          Включать прописные буквы:
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
        </label>
      </div>
      <div>
        <label>
          Включать символы:
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
        </label>
      </div>
      <div>
        <label>
          Не использовать похожие символы:
          <input
            type="checkbox"
            checked={noSimilarChars}
            onChange={(e) => setNoSimilarChars(e.target.checked)}
          />
        </label>
      </div>
      <div>
        <label>
          Не использовать повторяющиеся символы:
          <input
            type="checkbox"
            checked={noDuplicateChars}
            onChange={(e) => setNoDuplicateChars(e.target.checked)}
          />
        </label>
      </div>
      <div>
        <label>
          Не использовать последовательные символы:
          <input
            type="checkbox"
            checked={noSequentialChars}
            onChange={(e) => setNoSequentialChars(e.target.checked)}
          />
        </label>
      </div>
      <button onClick={generatePassword} style={{ margin: '10px 0' }}>
        Сгенерировать пароль
      </button>
    </div>
  );
};

export default PasswordSettings;
