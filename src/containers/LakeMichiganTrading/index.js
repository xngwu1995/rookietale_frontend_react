import React, { useEffect, useState } from "react";
import { useGoTo } from "@utils/hooks";
import { useAppContext } from "@utils/context";
import "./index.css";
import Layout from "@components/Layout";
import Select from "react-select";
import {
  createTradeRecord,
  getAllStocks,
  getAllTradeRecord,
  updateTradeRecord,
} from "@services/stock";

const mockStrategyList = ["VCP", "WXG"].map(strategy => ({
  value: strategy,
  label: strategy,
}));
const mockReasonList = ["None", "CHATGPT", "GEMINI", "RSU"].map(reason => ({
  value: reason,
  label: reason,
}));

function Form({ onAddRecord, stocks }) {
  const [formData, setFormData] = useState({
    stock_id: null,
    cost: "",
    quantity: "",
    strategy: [],
    reason: [],
    created_date: "",
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: selectedOption,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const strategies = formData.strategy
      .map(option => option.value)
      .join(" + ");
    const reasons = formData.reason.map(option => option.value).join(" + ");
    onAddRecord({
      ...formData,
      stock_id: formData.stock_id.value,
      strategy: strategies,
      reason: reasons,
      active: true,
    });
    setFormData({
      stock_id: null,
      cost: "",
      quantity: "",
      strategy: [],
      reason: [],
      created_date: "",
    });
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <label htmlFor="ticker">Ticker</label>
      <Select
        id="stock_id"
        name="stock_id"
        value={formData.stock_id}
        onChange={handleSelectChange}
        options={stocks.map(stock => ({
          value: stock.id,
          label: stock.ticker,
        }))}
        placeholder="Select or type a stock"
        isClearable
        isSearchable
        className="react-select-container"
        classNamePrefix="react-select"
      />
      <label htmlFor="cost">Cost</label>
      <input
        id="cost"
        name="cost"
        type="number"
        value={formData.cost}
        onChange={handleChange}
        required
      />
      <label htmlFor="quantity">Quantity</label>
      <input
        id="quantity"
        name="quantity"
        type="number"
        value={formData.quantity}
        onChange={handleChange}
        required
      />
      <label htmlFor="strategy">Strategy</label>
      <Select
        id="strategy"
        name="strategy"
        value={formData.strategy}
        onChange={handleSelectChange}
        options={mockStrategyList}
        placeholder="Select strategies"
        isMulti
        isClearable
      />
      <label htmlFor="reason">Reason</label>
      <Select
        id="reason"
        name="reason"
        value={formData.reason}
        onChange={handleSelectChange}
        options={mockReasonList}
        placeholder="Select reasons"
        isMulti
        isClearable
      />
      <label htmlFor="date">Date</label>
      <input
        type="date"
        name="created_date"
        value={formData.created_date}
        onChange={handleChange}
        className="dateinput"
      />
      <button>Add Record</button>
    </form>
  );
}

function Records({ records, updateRecord }) {
  const [filter, setFilter] = useState("active");

  let filteredRecords;

  if (filter === "active")
    filteredRecords = records.slice().filter(record => record.active);
  if (filter === "sold")
    filteredRecords = records.slice().filter(record => !record.active);

  return (
    <div className="records-container">
      <h2>Trading Records</h2>
      <div className="filter-container">
        <label htmlFor="filter">Filter by Status: </label>
        <select
          id="filter"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="active">Active</option>
          <option value="sold">Sold</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Cost</th>
            <th>Quantity</th>
            <th>Strategy</th>
            <th>Buy Reason</th>
            <th>Status</th>
            <th>Sell Reason</th>
            <th>Sell Price</th>
            <th>Sell Date</th>
            {filter === "active" ? <th>Closed Price</th> : <th>Revenue</th>}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map(record => (
            <Record
              key={record.id}
              record={record}
              onRecordUpdate={updateRecord}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Record({ record, onRecordUpdate }) {
  const [sellReason, setSellReason] = useState(record.sellReason || "");
  const [sellPrice, setSellPrice] = useState(record.sellPrice || 0);
  const [sellDate, setSellDate] = useState(record.sellDate || "");
  const [active, setActive] = useState(record.active);

  const handleStatusChange = () => {
    const updatedRecord = {
      ...record,
      active: !active,
      sellReason: active ? sellReason : "",
      sellPrice: active ? sellPrice : 0,
      sellDate: active ? sellDate : "",
    };
    onRecordUpdate(updatedRecord);
    setActive(!active);
  };

  const handleSellReasonChange = e => setSellReason(e.target.value);
  const handleSellPriceChange = e => setSellPrice(e.target.value);
  const handleSellDateChange = e => setSellDate(e.target.value);

  return (
    <tr>
      <td>{record.stock.ticker}</td>
      <td>{record.cost}</td>
      <td>{record.quantity}</td>
      <td>{record.strategy}</td>
      <td>{record.reason}</td>
      <td className={`record-status ${active ? "active" : "sold"}`}>
        {active ? "active" : "sold"}
      </td>
      <td>
        {!active ? (
          sellReason
        ) : (
          <input
            className="sell-reason-input"
            value={sellReason}
            onChange={handleSellReasonChange}
            placeholder="Sell Reason"
          />
        )}
      </td>
      <td>
        {!active ? (
          sellPrice
        ) : (
          <input
            id="sellprice"
            name="sellprice"
            type="number"
            value={sellPrice}
            onChange={handleSellPriceChange}
            required
          />
        )}
      </td>
      <td>
        {!active ? (
          sellDate
        ) : (
          <input
            type="date"
            name="selldate"
            value={sellDate}
            onChange={handleSellDateChange}
            className="dateinput"
            required
          />
        )}
      </td>
      {active ? <td>{record.closed}</td> : <td>{record.revenue}</td>}
      <td>
        <button
          className={active ? "sell-button" : "reactive-button"}
          onClick={handleStatusChange}
        >
          {active ? "Mark as Sold" : "Reactive"}
        </button>
      </td>
    </tr>
  );
}

function TradingPage() {
  const [store, setStore] = useAppContext();
  const go = useGoTo();
  const [records, setRecords] = useState([]);
  const [stocks, setStocks] = useState([]);

  const handleAddRecord = async newRecord => {
    const data = await createTradeRecord(newRecord);
    setRecords([...records, data.trade_record]);
  };

  const updateRecord = async updatedRecord => {
    const data = await updateTradeRecord(updatedRecord.id, updatedRecord);
    updatedRecord = data.trade_record;
    setRecords(
      records.map(record =>
        record.id === updatedRecord.id ? updatedRecord : record
      )
    );
  };

  const fetchTradeRecord = async () => {
    const resp = await getAllTradeRecord(store.user.id);
    const data = await resp.trade_records;
    setRecords(data);
  };

  const fetchAllStocks = async () => {
    const resp = await getAllStocks();
    const data = await resp.stocks;
    setStocks(data);
  };

  useEffect(() => {
    if (!store.user) go("login");
  }, [store.user, go]);

  useEffect(() => {
    setStore({ closeHeaderHandler: () => go("/") });
  }, [go]);

  useEffect(function () {
    fetchAllStocks();
  }, []);

  useEffect(function () {
    fetchTradeRecord();
  }, []);

  return (
    <Layout>
      <div className="trading-page">
        <Form onAddRecord={handleAddRecord} stocks={stocks} />
        <Records records={records} updateRecord={updateRecord} />
      </div>
    </Layout>
  );
}

export default TradingPage;
