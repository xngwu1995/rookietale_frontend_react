import React, { useState } from 'react';
import style from './index.module.scss';

const Chatgpt = () => {
  const [inputData, setInputData] = useState({ requirements: '', content: '' });
  const [response] = useState('');

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send inputData to backend
    // Example: const res = await sendToBackend(inputData);
    // setResponse(res);
  };

  return (
    <div className={style.homeContainer}>
      <form onSubmit={handleSubmit}>
        <div className={style.inputGroup}>
          <label htmlFor="requirements">
            Requirements
            <input
              type="text"
              id="requirements"
              name="requirements"
              value={inputData.requirements}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={style.inputGroup}>
          <label htmlFor="content">
            Content
            <textarea
              id="content"
              name="content"
              value={inputData.content}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit" className={style.submitButton}>Submit</button>
      </form>
      {response && <div className={style.response}>{response}</div>}
    </div>
  );
};

export default Chatgpt;
