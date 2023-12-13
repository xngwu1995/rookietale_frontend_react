import React, { useEffect, useState } from 'react';
import { useAppContext } from '@utils/context';
import { useGoTo } from '@utils/hooks';
import { askChatGPT } from '@services/chatgpt';
import style from './index.module.scss';

const Chatgpt = () => {
  const [inputData, setInputData] = useState({
    requirements: '',
    content: '',
    wordLimit: '',
    outlines: [], // Array to hold outlines as tags
    languageSelect: 'chinese',
  });
  const [response, setResponse] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [, setErrorMessage] = useState('');
  const [, setStore] = useAppContext();
  const go = useGoTo();

  useEffect(() => {
    setStore({ closeHeaderHandler: () => go('/') });
  }, []);

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleOutlineChange = (event) => {
    setInputData({ ...inputData, outline: event.target.value });
  };

  const handleAddOutline = (event) => {
    event.preventDefault();
    if (inputData.outline.trim()) {
      setInputData({
        ...inputData,
        outlines: [...inputData.outlines, inputData.outline.trim()],
        outline: '',
      });
    }
  };

  const handleRemoveOutline = (index) => {
    const newOutlines = inputData.outlines.filter((_, i) => i !== index);
    setInputData({ ...inputData, outlines: newOutlines });
  };

  const truncateOutline = (outline) => {
    const maxWords = 3;
    const words = outline.split(' ');
    if (words.length > maxWords) {
      return `${words.slice(0, maxWords).join(' ')}...`;
    }
    return outline;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Check if any field is empty
    if (!inputData.requirements
      || !inputData.wordLimit || !inputData.content
      || !inputData.languageSelect) {
      setShowWarning(true);
      return; // Prevent form submission
    }
    // Check if the form has already been submitted
    if (isSubmitted) return;
    setShowWarning(false);
    setIsSubmitted(true); // Set isSubmitted to true

    try {
      // Call askChatGPT with inputData
      const apiResponse = await askChatGPT(inputData);
      setResponse(apiResponse); // Use setResponse to update the response state
    } catch (error) {
      // Handle the error appropriately
      // For example, you can set an error message in the state to display to the user
      setErrorMessage('Failed to get a response from the API. Please try again.');
    } finally {
      setIsSubmitted(false); // Reset isSubmitted to allow for re-submission
    }
  };

  return (
    <div className={style.homeContainer}>
      <form onSubmit={handleSubmit}>
        <div className={style.inputGroup}>
          <label htmlFor="requirements">
            需求 (Requirements)
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
          <label htmlFor="words">
            字数要求 (Word Limits)
            <input
              type="number"
              id="wordLimit"
              name="wordLimit"
              value={inputData.wordLimit}
              onChange={handleChange}
              min="1" // Optional: Ensures only positive numbers
            />
          </label>
        </div>
        <div className={style.inputGroup}>
          <label htmlFor="outline">
            大纲 (outline)
            <input
              type="text"
              id="outline"
              name="outline"
              value={inputData.outline}
              onChange={handleOutlineChange}
            />
            <button type="button" onClick={handleAddOutline}>Add</button>
          </label>
        </div>
        <div className={style.outlineTags}>
          {inputData.outlines.map((outline, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className={style.tag}>
              {truncateOutline(outline)}
              <button type="button" onClick={() => handleRemoveOutline(index)}>×</button>
            </div>
          ))}
        </div>
        <div className={style.inputGroup}>
          <label htmlFor="content">
            内容 (content)
            <textarea
              id="content"
              name="content"
              value={inputData.content}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={style.inputGroup}>
          <label htmlFor="languageSelect">
            选择语言 (Select Language)
            <select
              id="languageSelect"
              name="languageSelect"
              value={inputData.languageSelect}
              onChange={handleChange}
            >
              <option value="chinese">中文 (Chinese)</option>
              <option value="english">英文 (English)</option>
            </select>
          </label>
        </div>
        {showWarning && (
          <div className={style.warningMessage}>
            请填写所有内容
            (Please fill in all fields.)
          </div>
        )}
        <button type="submit" className={style.submitButton} disabled={isSubmitted}>
          {isSubmitted ? '加载...' : '提交'}
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
