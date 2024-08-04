import React, { useEffect, useState } from "react";
import { useAppContext } from "@utils/context";
import { useGoTo } from "@utils/hooks";
import Select from "react-select";
import Cookies from "js-cookie";
import { getAllStocks } from "@services/stock";
import { getStockSignal } from "@services/chatgpt";
import style from "./index.module.scss";

const StockGPTPage = () => {
  const [inputData, setInputData] = useState({
    stocks: [],
    languageSelect: "chinese",
  });
  const [response, setResponse] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [stocks, setStocks] = useState([]);
  const go = useGoTo();

  const handleChange = e => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const fetchAllStocks = async () => {
    const resp = await getAllStocks();
    const data = await resp.stocks;
    setStocks(data);
  };

  useEffect(() => {
    if (!Cookies.get("access")) go("login");
  }, []);

  useEffect(function () {
    fetchAllStocks();
  }, []);

  const handleStockSelectChange = selectedOptions => {
    const selectedStocks = selectedOptions
      ? selectedOptions.map(option => option.value)
      : [];
    setInputData({ ...inputData, stocks: selectedStocks });
  };

  const handleSubmit = async e => {
    e.preventDefault(); // Prevent default form submission behavior
    // Check if any field is empty
    if (!inputData.languageSelect || inputData.stocks.length === 0) {
      setShowWarning(true);
      return; // Prevent form submission
    }
    // Check if the form has already been submitted
    if (isSubmitted) return;
    setShowWarning(false);
    setIsSubmitted(true); // Set isSubmitted to true

    try {
      // Call askChatGPT with inputData
      const resp = await getStockSignal(inputData);
      const data = await resp.signals;
      setResponse(data); // Use setResponse to update the response state
    } catch (error) {
      // Handle the error appropriately
      // For example, you can set an error message in the state to display to the user
      setErrorMessage(
        "Failed to get a response from the API. Please try again."
      );
    } finally {
      setIsSubmitted(false); // Reset isSubmitted to allow for re-submission
    }
  };

  return (
    <div className={style.homeContainer}>
      <form onSubmit={handleSubmit}>
        <Select
          id="stocks"
          name="stocks"
          value={inputData.stocks.map(stock => ({
            value: stock,
            label: stock,
          }))}
          onChange={handleStockSelectChange}
          options={stocks.map(stock => ({
            value: stock.ticker,
            label: stock.ticker,
          }))}
          placeholder="(请选择一支或多支股票)Select or type a stock"
          isMulti
          isClearable
          isSearchable
          className="react-select-container"
          classNamePrefix="react-select"
        />
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
            请填写所有内容 (Please fill in all fields.)
          </div>
        )}
        <button
          type="submit"
          className={style.submitButton}
          disabled={isSubmitted}
        >
          {isSubmitted ? "加载(Loading)..." : "提交(Submit)"}
        </button>
      </form>
      {response && (
        <div className={style.responses}>
          {response.map((item, index) => (
            <div key={index} className={style.responseItem}>
              <h2>Stock Symbol: {item.stock_symbol}</h2>
              <p>{item.gpt_result}</p>
            </div>
          ))}
        </div>
      )}
      {errorMessage && <div className={style.errorMessage}>{errorMessage}</div>}
    </div>
  );
};

export default StockGPTPage;
