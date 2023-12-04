import React, { useState } from 'react';
import { askChatGPT } from '@services/chatgpt';
import style from './index.module.scss';

const Chatgpt = () => {
  const [inputData, setInputData] = useState({ requirements: '', content: '' });
  const [response, setResponse] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if the form has already been submitted
    if (isSubmitted) return;

    setIsSubmitted(true); // Set isSubmitted to true

    try {
      // Call askChatGPT with inputData
      const apiResponse = await askChatGPT(inputData);
      setResponse(apiResponse); // Use setResponse to update the response state
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitted(false); // Reset isSubmitted to allow for re-submission
    }
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
        <button type="submit" className={style.submitButton} disabled={isSubmitted}>
          {isSubmitted ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {response && (
      <div className={style.response}>
        <h2>Response</h2>
        <p>{response.response_text}</p>
      </div>
      )}
    </div>
  );
};

export default Chatgpt;
